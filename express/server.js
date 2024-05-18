const expres=require("express");
const app=expres();

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/home.html");
})

app.get("/style.css",(req,res)=>{
    res.sendFile(__dirname+"/style.css");
})

app.get("/index.js",(req,res)=>{
    res.sendFile(__dirname+"/index.js");
})

app.get("*",(req,res)=>{
    res.send('page not found');
})

app.listen(3000,(err)=>{
    if(err)
    console.log(err);
else
console.log("server started");
})