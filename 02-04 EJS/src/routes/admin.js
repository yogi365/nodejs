module.exports = (
    function(){
        const router = require('express').Router()
        router.get('/admin',(req,res)=>{
            res.sendFile('/admin/dashboard.html',{root:'./public'})
        });

        return router;
    }
)();