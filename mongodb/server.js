const express=require("express");
const app=express();
//npm i mongodb
const mongodb=require("mongodb"); //multiple classes
const client=mongodb.MongoClient;
const object=mongodb.ObjectId;
app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));
let dbinstance;
app.use((req,res,next)=>{
    console.log(req.url);
    next();
})
client.connect("mongodb://127.0.0.1:27017").then((database)=>{
    console.log("connected")
   dbinstance=database.db("sectionE");
}).catch(e=>{
    console.log(e);
})

// app.get("/home/:name",(req,res)=>{
//     var name=req.params.name;
//     dbinstance.collection("user").insertOne({name:name}).then(data=>{
//         console.log(data);
//         res.send("succ add");
//     })
// })

app.get("/show/:id",(req,res)=>{
    console.log(req.params.id);
    dbinstance.collection("user").findOne({_id:new object(req.params.id)}).then(data=>{
        // console.log(data);
        res.send(data);
    })
})

app.get("/",(req,res)=>{
    dbinstance.collection("product").find({}).toArray().then(data=>{
         console.log(data);
        res.render("dashboard",{data});
    })
})

app.get("/view/:id",(req,res)=>{
    dbinstance.collection("product").findOne({_id:new object(req.params.id)}).then(data=>{
        // console.log(data);
        res.render("view",{data});
    })
})

app.get("/delete/:id",(req,res)=>{
    dbinstance.collection("product").findOne({_id:new object(req.params.id)}).then(data=>{
        // console.log(data);
        res.render("delete",{data});
    })
})

app.get("/update/:id",(req,res)=>{
    dbinstance.collection("product").findOne({_id:new object(req.params.id)}).then(data=>{
         console.log(data);
        res.render("update",{data});
    })
})

app.post("/confirmupdate",(req,res)=>{
    console.log(req.url);
    dbinstance.collection("product").updateOne({_id:new object(req.body.id)},{$set:{"price":req.body.price}}).then(data=>{
        // console.log(data);
        res.redirect("/");
    }) 
})


app.get("/confirmdelete/:id",(req,res)=>{
    dbinstance.collection("product").deleteOne({_id:new object(req.params.id)}).then(data=>{
        // console.log(data);
        res.redirect("/");
    })
})

// app.get("/signup",(req,res)=>{
// res.render("signup",{message:""});
// })
// app.post("/signup",(req,res)=>{
//     dbinstance.collection("user").find({name:req.body.name,pass:req.body.pass}).toArray().then(data=>{
//         if(data.length>0){
//             res.render("signup",{message:"already exist"})
//         }else{
//             dbinstance.collection("user").insertOne(req.body).then(data=>{
//                 res.redirect("/login");
//             })
//         }
//     })
//     })


app.listen(3000,(err)=>{
    if(err)
    console.log(err);
else
console.log("server running");
});
