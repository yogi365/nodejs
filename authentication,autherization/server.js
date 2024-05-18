const express=require("express");
const app=express();
const fs=require("fs");
const cookie=require("cookie-parser");
const session=require("express-session");

app.use(cookie());
app.use(session({
    saveUninitialized:true,
    resave:false,
    secret:"abc"
}))

app.use(express.urlencoded({extended:false}));
app.use(express.json());

function check(req,res,next){
    if(req.session.username)
    next();
   else
   res.redirect("/login");
}

app.get("/",check,(req,res)=>{
    res.sendFile(__dirname+"/dashboard.html");
})

app.get("/home",check,(req,res)=>{
    res.sendFile(__dirname+"/home.html");
})

function auth(req,res,next){
    if(req.session.username&&req.session.role=="admin")
    next();
   else
   res.redirect("/");
}

app.get("/admin",auth,(req,res)=>{
    res.sendFile(__dirname+"/admin.html");
})

app.get("/login",(req,res)=>{
    if(req.session.username)
    res.redirect("/");
else
    res.sendFile(__dirname+"/login.html");
})
app.get("/signup",(req,res)=>{
    if(req.session.username)
    res.redirect("/");
else
    res.sendFile(__dirname+"/signup.html");
})
app.post("/login",(req,res)=>{
   let {pass,email}=req.body;
   fs.readFile(__dirname+"/user.json","utf-8",(err,data)=>{
    if(err){
        res.status(500).send("Internal server error");
    }else{
        data=JSON.parse(data);
        // let flag=false;
        // data.forEach(element => {
        //     if(element.pass==pass&&element.email==email){
        //         flag=true;
        //     }
        // });
        let result=data.filter((element)=>{
            if(element.pass==pass&&element.email==email){
                       return true;
                    }
        })
        if(result.length>0){
            req.session.username=email;
            req.session.role=result[0].role;
           res.redirect("/");
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
            let obj={
               name:req.body.name,
               email:req.body.email,
               pass:req.body.pass,
               role:"user"
            }
            data.push(obj);
            fs.writeFileSync(__dirname+"/user.json",JSON.stringify(data));
            res.redirect("/login");
        }
    }
   })
})

app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/login");
})

app.listen(3000);