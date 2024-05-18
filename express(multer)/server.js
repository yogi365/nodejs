const express=require("express");
const app=express();
const multer=require("multer");

const maxSize=1*1024*1024 //1 MB

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        console.log(file);
    //     if(user=="admin")
    //     cb(null,__dirname+"/public/admin");
    // else{
        cb(null,__dirname+"/done/files");
    // }
    },
    filename:(req,file,cb)=>{
        var name=Date.now()+".jpg";
        cb(null,name);
    }

})
const filter=(req,file,cb)=>{
  var ext=file.mimetype.split("/")[1];
  if(ext=="jpeg"||ext=="jpg"){
    cb(null,true);
  }else{
    cb(new Error("not supported"),false);
  }
}



const upload=multer({storage:storage,fileFilter:filter,limits:{fileSize:maxSize}});
// const upload=multer({dest:__dirname+"/public/files"});

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/upload.html");
})

//for handle multiple fields
app.post("/filelds",upload.fields([{name:"pic",maxCount:1},{name:"pic1",maxCount:1}]),(req,res)=>{
  console.log(req.body);
  console.log(req.files);
    res.end("multiple fields recived");
})

app.post("/upload",upload.single("pic"),(req,res)=>{
  console.log(req.body);
  console.log(req.file);
    res.end("file recived");
})
//for handle multiple file
app.post("/multiple",upload.array("pic",5),(req,res)=>{
  console.log(req.body);
  console.log(req.files);
    res.end("multiple files recived");
})


app.post("/withoutimage",upload.single("image"),(req,res)=>{
  console.log(req.body);
  const image = req.file ? req.file.filname : '';
  console.log(image); 
})

app.post("/none",upload.none(),(req,res)=>{
  console.log(req.body);
    res.end("data recived");
})



app.listen(3000);
