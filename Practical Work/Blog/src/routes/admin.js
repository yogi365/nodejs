const { connect } = require('http2');

module.exports=(
    function(){
        const router = require('express').Router();
        const fs = require('fs');
        const {MongoClient} = require('mongodb');
    
        const client = new MongoClient('mongodb+srv://user:user123@chat.5hlcps0.mongodb.net/?retryWrites=true&w=majority&appName=chat')
   
        router.get('/dashboard',async (req,res)=>{
            const article=JSON.parse(fs.readFileSync('./src/model/article.json','utf-8'));
            await client.connect();
            const users = await client.db('webblog').collection('users').find({}).toArray();
            await client.close();  
            res.render('./admin/dashboard.ejs',{user:req.session.user,article,users})
        })

        router.get('/addUser',(req,res)=>{
            res.render('./admin/adduser.ejs');
        })

        router.post('/addUser',async (req,res)=>{

            await client.connect();
            const db = client.db('webblog');
            const collection = db.collection('users');
            await collection.insertOne({
                username:req.body.username,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password:req.body.password,
                role:req.body.role
            })

            await client.close();
            res.redirect('/admin/dashboard');
        });

        router.get('/deleteUser/:userName',async (req,res)=>{
            console.log('delete request recived');
            await client.connect();
            const result = await client.db('webblog').collection('users').deleteOne({'userName':req.params.userName});
            await client.close();  
            console.log(result);
            
            if(result.acknowledged){
                res.json(JSON.stringify({message:'ok'}));
            }
            else{
                res.json(JSON.stringify({message:'error'}));
            }
            
        });
        return router;
    }
)();