const express=require("express");
const app=express();
/*please read these multi comment also
before coming version 4.16.0 of express
firstly we have to install bodyparser to parse post data
using command npm i body-parser
and then use these to parse body data and use 
but in version 4.16.0 or later there is no requirement you can use directly
by express as we done in class
*/
// const bodyparser=require("body-parser")
// app.use(bodyparser.urlencoded({extended:false}));
// app.use(bodyparser.json())


//these middleware is used when application/www.urlencoded data come
app.use(express.urlencoded({extended:false}));
//these middleware is used when application/json data come
app.use(express.json())

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/login.html");
})

app.get("/add",(req,res)=>{
    console.log(req.query);
    res.send("ok");
})

app.post("/add",(req,res)=>{
    console.log(req.body);
    res.send("done");
})

app.listen(3000);


