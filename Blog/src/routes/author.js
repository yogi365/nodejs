module.exports=(
    function(){
        const router = require('express').Router();
        const fs = require('fs');
   
        router.get('/dashboard',(req,res)=>{
            const allArticles=JSON.parse(fs.readFileSync('./src/model/article.json','utf-8'));
            const articles = allArticles.filter(article=>article.authorId == req.session.user.id);
            res.render('./author/dashboard.ejs',{user:req.session.user,articles})
        })

        return router;
    }
)();