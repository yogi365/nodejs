module.exports = (
    function(){
        const router = require('express').Router();
        
        const article = require('../model/article');
        router.get('/',async (req,res)=>{
            const articles =  await article.find({})            
            res.render('./home/home.ejs',{articles,users:req.session.user})
        })

        router.get('/post/:id',async (req,res)=>{
            const post =  await article.findById(req.params.id);            
            res.render('./home/post.ejs',{post,users:req.session.user});
        })

        return router;
    }
)();