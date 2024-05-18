const express=require("express");
const app=express();
const session=require("express-session");

app.use(session({
    saveUninitialized:true,
    resave:false,
    secret:"abc",
}))
app.use(express.urlencoded({extended:false}));

app.get("/login",(req,res)=>{
    if(req.session.logedin){
        res.redirect("/");
    }else{
      res.sendFile(__dirname+"/login.html");
    }
})
app.post("/login",(req,res)=>{
    console.log(req.body)
})

app.get("/",(req,res)=>{
    if(req.session.logedin){
        res.send("welcome home page");
    }else{
       
    res.redirect("/login");
    }
   
})

app.listen(3000);
