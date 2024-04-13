module.exports = (
    function () {
        const router = require('express').Router();
        const multer = require('multer');
        const path = require('path');
        const fs = require('fs');

        const storage = multer.diskStorage({
            destination: './public/images',
            filename: function (req, file, cb) {                
                cb(null, Date.now() + '-' + file.originalname);
            }
        });

        const upload = multer({
            storage: storage,
            fileFilter: function (req, file, cb) {                
                const extension = path.extname(file.originalname);              
                if (extension.toLowerCase() == '.jpg' || extension.toLowerCase() == '.jpeg') {
                    cb(null, true);
                }
                else {
                    cb(new Error('Invalid file type'))
                }
            }
        });
        router.get('/add', (req, res) => {
            res.render('./articles/add.ejs');
        })

        router.post('/add', upload.single('image'), (req, res) => {                   
                const articles = JSON.parse(fs.readFileSync('./src/model/article.json', 'utf-8'));                
                console.log(req.file);
                const article = {
                    articleId: Date.now(),
                    title: req.body.title,
                    article: req.body.article,
                    image: req.file.filename,
                    date: new Date().toLocaleDateString(),
                    author: req.session.user.firstName+" "+req.session.user.lastName,
                    authorId: req.session.user.id
                }
                articles.push(article);
                fs.writeFileSync('./src/model/article.json',JSON.stringify(articles));
                res.render('./articles/add', { message: 'Record added sucessfully' })
            
        });

        router.get('/delete/:id',(req,res)=>{
            const articles = JSON.parse(fs.readFileSync('./src/model/article.json', 'utf-8'));            
            const articleIndex = articles.findIndex((article=>article.articleId==req.params.id));
            if(articleIndex<0){
                res.json(JSON.stringify({message:'error'}));
            }
            else{
                articles.splice(articleIndex,1);
                res.json(JSON.stringify({message:'ok'}));
                fs.writeFileSync('./src/model/article.json',JSON.stringify(articles));
            }            
        })
        return router;
    }
)();