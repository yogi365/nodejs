const express=require("express");
const app=express();
const multer=require("multer");
const session=require("express-session");
// const upload=multer({dest:__dirname+"/public"});
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
cb(null,__dirname+"/public");
    },
    filename:(req,file,cb)=>{
cb(null,Date.now()+".jpg");
    }
})

app.use(session({
    saveUninitialized:true,
    resave:false,
    secret:"abc",
}))

const filter=(req,file,cb)=>{
cb(null,true);
}
const upload=multer({storage:storage,fileFilter:filter});
const mongodb=require("mongodb");
const client=mongodb.MongoClient;
let instance;
client.connect("mongodb+srv://Rakhi:abc123abc@cluster0.qzwljbc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(databases=>{
instance=databases.db("SectionE");
console.log("connected");
})

app.use(express.urlencoded({extended:false}));
app.get("/",(req,res)=>{
    if(req.session.name)
    res.send("hello");
else
res.redirect("/login");
})
app.get("/login",(req,res)=>{
    if(req.session.name)
    res.redirect("/");
else
    res.sendFile(__dirname+"/login.html");
})

app.post("/login",(req,res)=>{
instance.collection("user").find(req.body).toArray().then(data=>{
  if(data.length>0){
    req.session.name=data[0].name;
    res.redirect("/");
  } else{
    res.redirect("/signup");
  } 
})
})


app.get("/signup",(req,res)=>{
    if(req.session.name)
    res.redirect("/");
else
    res.sendFile(__dirname+"/signup.html");
})

app.post("/signup",upload.single("pic"),(req,res)=>{
instance.collection("user").find({name:req.body.name}).toArray().then(async (data)=>{
  if(data.length>0){
    res.send("already exist");
  } else{
    const image = req.file ? req.file.filename : '';
   let result=await instance.collection("user").insertOne({name:req.body.name,email:req.body.email,password:req.body.password,image:image})
   res.redirect("/login");
  } 
})
})

app.get("/logout",(req,res)=>{
    delete req.session.name;
  //  req.session.destroy();
  res.redirect("/login");
})

app.listen(3000);