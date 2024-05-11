module.exports=(
    function(){
        const router = require('express').Router();
        router.get('/user',(req,res)=>{
            res.sendFile('/user/dashboard.html',{root:'./public'})
        })

        return router;
        
    }
)();