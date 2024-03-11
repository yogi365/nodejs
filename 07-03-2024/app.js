const express = require('express');
const app = express();
const path = require('path');
app.listen(3030)
const multer = require('multer');
const storage = multer.diskStorage({
    destination:'./upload',
    filename:function(req,file,cb){
        cb(null,file.filename+"-"+Date.now()+""+path.extname(file.originalname))
    }
}) 
const upload = multer({storage:storage});

app.post('/fileUpload',upload.array('images',10),(req,res)=>{
    console.log(req.files)
    res.send('file uploaded');
})