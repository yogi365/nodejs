module.exports=(
    function(){
        const router = require('express').Router();
        const fs = require('fs');
   
        router.get('/dashboard',(req,res)=>{
            const article=JSON.parse(fs.readFileSync('./src/model/article.json','utf-8'));
            const users = JSON.parse(fs.readFileSync('./src/model/user.json','utf-8'));
            res.render('./admin/dashboard.ejs',{user:req.session.user,article,users})
        })

        router.get('/addUser',(req,res)=>{
            res.render('./admin/adduser.ejs');
        })

        router.post('/addUser',(req,res)=>{
            const users = JSON.parse(fs.readFileSync('./src/model/user.json','utf-8'));
            const user = users.find(user=>user.username==req.body.username);

            if(user){
                res.send('User already exist');
            }
            else{
                const userObj = {
                    username:req.body.username,
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    email:req.body.email,
                    password:req.body.password,
                    role:req.body.role
                }
                users.push(userObj);
                fs.writeFileSync('./src/model/user.json',JSON.stringify(users));
                res.send('User Added Succesfully')
            }

        });

        router.post('/admin/deleteUser',(req,res)=>{
            const users = JSON.parse(fs.readFileSync('./src/model/user.json','utf-8'));
            const userIndex = users.findIndex(user=>req.params.username == user.username);
            if(userIndex<0){
                res.json(JSON.stringify({message:'Something went wrong'}));
            }
            else{
                users.splice(userIndex,1);
                res.json(JSON.stringify({message:'User delete successfully'}));            }
            
        });
        return router;
    }
)();