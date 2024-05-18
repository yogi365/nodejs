const express=require('express')
const app=express()
const multer=require('multer')
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        console.log(file);
        cb(null,__dirname+'/public');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'.jpg')
    }
})

const filter = (req,file,cb)=>{
    if(file.mimetype.split('/')[1]=='jpg' || file.mimetype.split('/')[1]=='jpeg' || file.mimetype.split('/')[1]=='html' )
        cb(null,true)
    else 
        cb(new Error('Invalid File Extension !'),false)
}

const upload = multer({storage:storage, fileFilter: filter, limits:{fileSize:1024*1024*4} });

app.get('/reel',(req,res)=>{
    res.sendFile(__dirname+'/upload.html')
})

app.post('/reel',upload.single("img"),(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    res.send('UPLOADED !!')
})

// app.get('/view',(req,res)=>{
//     res.render()
// })

app.listen(1000,()=> console.log('started'));