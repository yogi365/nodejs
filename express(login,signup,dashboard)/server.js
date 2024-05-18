const express=require("express");
const app=express();
const fs=require("fs");
const multer=require("multer");
app.use(express.static(__dirname+"/public"));
const upload=multer({dest:__dirname+"/public"});

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/admin.html");
})
app.post("/upload",upload.single("pic"),(req,res)=>{
const {name,price,desc,id}=req.body;
const image=req.file.filename;
const obj={name,price,id,desc,image};
fs.readFile(__dirname+"/product.json","utf-8",(err,data)=>{
    data=JSON.parse(data);
    data.push(obj);
    fs.writeFileSync(__dirname+"/product.json",JSON.stringify(data));
    res.redirect("/");
})
})

app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/login.html");
})
app.get("/signup",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})
app.post("/login",(req,res)=>{
   let {pass,email}=req.body;
   fs.readFile(__dirname+"/user.json","utf-8",(err,data)=>{
    if(err){
        res.status(500).send("Internal server error");
    }else{
        data=JSON.parse(data);
        let flag=false;
        data.forEach(element => {
            if(element.pass==pass&&element.email==email){
                flag=true;
            }
        });
        if(flag){
            res.sendFile(__dirname+"/dashboard.html");
        }else{
            res.redirect("/signup");
        }
    }
   })
})
app.post("/signup",(req,res)=>{
    let {email}=req.body;
   fs.readFile(__dirname+"/user.json","utf-8",(err,data)=>{
    if(err){
        res.status(500).send("Internal server error");
    }else{
        data=JSON.parse(data);
        let flag=false;
        data.forEach(element => {
            if(element.email==email){
                flag=true;
            }
        });
        if(flag){
          res.send("email already exist");
        }else{
            data.push(req.body);
            fs.writeFileSync(__dirname+"/user.json",JSON.stringify(data));
            res.redirect("/login");
        }
    }
   })
})

app.get("/getAllProduct",(req,res)=>{
    res.sendFile(__dirname+"/product.json");
})

app.get("/showdesc/:id",(req,res)=>{
    fs.readFile(__dirname+"/product.json","utf-8",(err,data)=>{
        if(err){
            res.status(500).send("Internal server error");
        }else{
            data=JSON.parse(data);
           let data1=data.filter(element => {
                if(element.id==req.params.id){
                   return true;
                }
            });
           res.send(data1[0].desc);
        }
       })
})
app.listen(3000);