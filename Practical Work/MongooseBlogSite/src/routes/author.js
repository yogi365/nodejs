module.exports=(
    function(){
        const router = require('express').Router();
        const Article = require('../model/article');
   
        router.get('/dashboard',async (req,res)=>{
            const articles = await Article.find({authorId:req.session.user._id})
            res.render('./author/dashboard.ejs',{users:req.session.user,articles})
        })

        return router;
    }
)();