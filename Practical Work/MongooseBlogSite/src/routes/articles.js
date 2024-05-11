module.exports = (
    function () {
        const router = require('express').Router();
        const multer = require('multer');
        const path = require('path');     
        const Article = require('../model/article');

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
            res.render('./articles/add.ejs',{users:req.session.user});
        })

        router.post('/add', upload.single('image'), async (req, res) => {                   
                try{
                    const article = await Article.create({
                        title: req.body.title,
                        article: req.body.article,
                        image: req.file.filename,
                        date: new Date().toLocaleDateString(),
                        author: req.session.user.firstName+" "+req.session.user.lastName,
                        authorId: req.session.user._id.toString()
                    });
                    res.render('./articles/add', { message: 'Record added sucessfully' })
                }
                catch(e){
                    res.render('./articles/add', { message: e.message })
                }
        });

        router.get('/delete/:id',async (req,res)=>{                        
           try{
            const articleDelete = await Article.findByIdAndDelete({_id:req.params.id});
            console.log(articleDelete);
            res.json(JSON.stringify({message:'ok'}));            
           }
           catch(e){            
            res.json(JSON.stringify({message:e.message}));
           }                      
        })
        return router;
    }
)();