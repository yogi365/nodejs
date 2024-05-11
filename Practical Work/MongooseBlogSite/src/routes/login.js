module.exports=(
    function(){
        const router = require('express').Router();
        const User = require('../model/users');
        
        router.get('/login',(req,res)=>{
            res.render('./login/login.ejs');
        })

        router.get('/logout',(req,res)=>{
            req.session.destroy(err=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.redirect('/')
                    }
                }
            );
        })

        router.post('/login',async(req,res)=>{
            const user = await User.findOne({username:req.body.username})
            
            if(user){
             
               if(user.password==req.body.pass){
                req.session.user = user;
                
                if(user.role=='admin'){
                    res.redirect('/admin/dashboard');
                }
                if(user.role=='author'){
                    res.redirect('/author/dashboard')
                }
               }
               else{
                res.render('./login/login.ejs',{'message':'Invalid password'})
               }
            }
            else{
                res.render('./login/login.ejs',{'message':'Invalid username'})
            }

        })

        return router;
    }
)();