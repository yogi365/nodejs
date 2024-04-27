module.exports = (
    function(){
        const router = require('express').Router();
        const fs = require('fs');
        router.get('/',(req,res)=>{
            const articles = JSON.parse(fs.readFileSync('./src/model/article.json'))

            res.render('./home/home.ejs',{articles})
        })

        router.get('/post/:id',(req,res)=>{
            const articles = JSON.parse(fs.readFileSync('./src/model/article.json'));
            const article = articles.find(article=>article.articleId==req.params.id);
        
            res.render('./home/post.ejs',{article});
        })

        return router;
    }
)();