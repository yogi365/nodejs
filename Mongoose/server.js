const express=require("express");
const app=express();
const session=require("express-session");
const multer=require("multer");
const abc=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,__dirname+"/public");
    },filename:(req,file,cb)=>{
        cb(null,Date.now()+".jpg");
    }
})

const filter=(req,file,cb)=>{
    if(file.mimetype.split("/")[1]=="jpg")
        cb(null,true)
    else
    cb(new Error("not supported"),false)
}


const upload=multer({storage:abc,fileFilter:filter,limits:{fieldSize:1024*1024}})
//const upload=multer({dest:__dirname+"/public"});
//npm i mongoose
 const model=require("./models.js");
//  const product=require("./models1.js");
const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://Rakhi:abcd123abcd@cluster0.qzwljbc.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0").then(res=>{
    console.log("connected");
}).catch(e=>{
    console.log(e);
})



function authentication(req,res,next){
    if(req.session.logedin){
res.redirect("/home");
    }else{
        next();
    }
}


app.use(session({
    saveUninitialized:true,
    resave:false,
    secret:"abc"
}))

app.use((req,res,next)=>{
    console.log(req.session);
    next();
})
app.use(express.urlencoded({
    extended:false,
}))



function authentication1(req,res,next){
    if(req.session.logedin){
       next();
            }else{
              res.redirect("/login");
            }
}

app.get("/home",authentication1,(req,res)=>{
    res.send("its home page");
})

app.get("/login",authentication,(req,res)=>{
    res.sendFile(__dirname+"/login.html");
})

app.get("/signup",authentication,(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})

app.post("/login",(req,res)=>{
    model.findOne({name:req.body.username,password:req.body.password}).then(data=>{
        if(data){
            req.session.logedin=true;
            req.session.detail=data;
            res.redirect("/home");
        }else{
            res.redirect("/signup");
        }})
})

app.post("/signup",(req,res)=>{
    model.findOne({name:req.body.username,password:req.body.password}).then(data=>{
        if(data){
            res.redirect("/login");
        }else{
            let obj={
                name:req.body.username,password :req.body.password,
            }
            let newuser=new model(obj); 
            newuser.save().then(data=>{
                res.send("user craeted succ");
            }).catch(e=>{
                res.send("something went wrong");
            })
        }
    })
})


app.listen(3000);















//npm i mongoose
// const model=require("./models.js");
// const mongoose=require("mongoose");
// mongoose.connect("mongodb://localhost:27017/sectionE").then(res=>{
//     console.log("connected");
// }).catch(e=>{
//     console.log(e);
// })

// app.get("/",(req,res)=>{
    // model.find({}).then(data=>{
    //     console.log(data);
    // }).catch(e=>{
    //     console.log(e);
    // })

    // model.findOne({_id:"662897118746e2c483ddcd6c"}).then(data=>{
    //     console.log(data);
    // }).catch(e=>{
    //     console.log(e);
    // })

    //   model.deleteOne({_id:"662897118746e2c483ddcd6c"}).then(data=>{
    //     console.log(data);
    // }).catch(e=>{
    //     console.log(e);
    // })

//     let obj={
//         name:"abc",
//         email:"a@a.com",
//         password:"abcd",
//     }

//     let newuser=new model(obj);
//     newuser.save().then(data=>{
//         console.log(data);
//     }).catch(e=>{
//         console.log(e);
//     })
// })

// app.listen(3000);
