module.exports=(
    function(){
        const router = require('express').Router();
        const fs = require('fs');
        const {MongoClient} = require('mongodb');
    
        const client = new MongoClient('mongodb+srv://user:user123@chat.5hlcps0.mongodb.net/?retryWrites=true&w=majority&appName=chat')
           
        router.get('/login',(req,res)=>{
            res.render('./login/login.ejs');
        })

        router.post('/login',async (req,res)=>{
            
            await client.connect();
            const user = await client.db('webblog').collection('users').findOne({username:req.body.username, password:req.body.pass});
            await client.close();
            console.log(user);                      
            if(user){
                req.session.user = user;
                
                if(user.role=='admin'){
                    res.redirect('/admin/dashboard');
                }
                if(user.role=='author'){
                    res.redirect('/author/dashboard')
                }
            }
            else{
                res.render('./login/login.ejs',{'message':'Invalid username or password'})
            }

        })

        return router;
    }
)();