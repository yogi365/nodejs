const express = require("express");
const app = express();
const fs = require("fs");
const session = require("express-session");
app.use(session({
    secret: "abc",
    saveUninitialized: true,
    resave: false
}))
app.use(express.urlencoded({ extended: false }));
//npm i ejs
app.set("view engine","ejs");
// app.set("views","abc");

function authentication(req,res,next){
    if(req.session.abc)
    next();
else
res.redirect("/login");
}
function autherization(req,res,next){
    if(req.session.abc&&req.session.obj.role=="admin")
    next();
else 
res.redirect("/");
}
app.get("/",authentication,(req,res)=>{
    fs.readFile(__dirname+"/product.json","utf-8",(err,data)=>{
        data=JSON.parse(data);
        res.render("dashboard",{name:req.session.obj.username,arr:data});
    })
   
})

app.get("/home",authentication,(req,res)=>{
    res.render("home");
})

app.get("/about",authentication,(req,res)=>{
    res.render("about");
})

app.get("/admin",autherization,(req,res)=>{
    res.render("admin");
})

app.get("/login",(req,res)=>{
    if(req.session.abc)
    res.redirect("/");
else
    res.render("login",{message:""});
})

app.post("/login",(req,res)=>{
    let {username,pass}=req.body;
    fs.readFile(__dirname+"/user.json","utf-8",(err,data)=>{
        data=JSON.parse(data);
        let result=data.filter((element)=>{
            if(element.username==username&&element.pass==pass){
                return true;
            }
        })
        if(result.length>0){
            req.session.abc=true;
            req.session.obj=result[0];
            res.redirect("/");
        }
        else{
        res.render("login",{message:"creadentials not matched"})
        }
    })
})

app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/login");
})
app.listen(3000);
