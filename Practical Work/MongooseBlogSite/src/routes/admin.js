module.exports=(
    function(){
        const router = require('express').Router();
        const fs = require('fs');
        const User = require('../model/users.js');
        const Article = require('../model/article.js');
           
        router.get('/dashboard', async (req,res)=>{
            const article= await Article.find({});
            const userDetails = await User.find({});
            res.render('./admin/dashboard.ejs',{users:req.session.user,article,userDetails})
        })

        router.get('/addUser',(req,res)=>{
            res.render('./admin/adduser.ejs',{users:req.session.user});
        })

        router.post('/addUser',async (req,res)=>{
           try{
            const user = await User.create({
                username:req.body.username,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password:req.body.password,
                role:req.body.role
               })               
                   
               console.log(user)
                res.send('User Added Succesfully')
           }
           catch(e){
            res.send(e.message);
           }            

        });

        router.get('/deleteUser/:username',async (req,res)=>{
            
            try{
                const users = await User.findOneAndDelete({username:req.params.username});               
                res.json(JSON.stringify({message:'ok'}));
            }
            catch(e){             
                res.json(JSON.stringify({message:'error'}))
            }
        }   );     
        return router;
    }
)();