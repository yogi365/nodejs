module.exports=(
    function(){
        const router = require('express').Router();
        const fs = require('fs');
        
        router.get('/login',(req,res)=>{
            res.render('./login/login.ejs');
        })

        router.post('/login',(req,res)=>{
            const users = JSON.parse(fs.readFileSync('./src/model/user.json','utf-8'));

            const user = users.find(user=>req.body.username==user.username && req.body.pass==user.password);
            
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