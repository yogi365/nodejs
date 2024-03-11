const express = require('express');
const app = express();
const path = require('path');
const fs = require("fs");
const cors = require('cors');
app.use(cors())
app.listen(3030)
const multer = require('multer');
app.use(express.static('./public'))
const storage = multer.diskStorage({
    destination:'./public/images',
    filename:function(req,file,cb){
        cb(null,Date.now()+""+path.extname(file.originalname))
    }
}) 
const upload = multer({storage:storage});

app.post('/fileUpload',upload.array('images',10),(req,res)=>{
    console.log(req.files)
    res.send('file uploaded');
})

app.get('/gallery',(req,res)=>{
    const files =  fs.readdirSync('./public/images');
    const filePath = files.map((file)=>{
        return '/images/'+file;        
    })
    res.json(filePath)
})