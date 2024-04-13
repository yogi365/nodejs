const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path')
app.listen(8080);
const storage = multer.diskStorage({
    destination:'./public/upload',
    filename:function(req,file,cb){
        const name = Date.now()+"-"+path.extname(file.originalname);
        cb(null,name);
    }
})
const size = 1024*1024*5;
const upload = multer(
    {
        storage:storage,
        limits:{fileSize:size},
        fileFilter:function(req,file,cb){
            if(file.mimetype=='image/jpg'){
                cb(null,true)
            }
            else{
                cb(new Error('Invalid mime type'))
            }
        }
    }
    )

// app.post('/upload',upload.single('fileUpload'),(req,res)=>{
//     console.log(req.file)
//     res.send('file uploaded successfully')
// })

app.post('/upload',upload.array('fileUpload',10),(req,res)=>{
    console.log(req.files);
    res.send('file uploaded successfully')
})

// const fieldDetails = [{name:'imageUpload',maxCount:1},{name:'fileUpload',maxCount:20}];
// app.post('/upload',upload.fields(fieldDetails),(req,res)=>{
//     console.log(req.files);
//     res.send('file uploaded successfully')
// })