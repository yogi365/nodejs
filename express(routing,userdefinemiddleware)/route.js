const express=require("express");
const route=express.Router();
route.get("/",(req,res)=>{
    res.end("done route work");
})
module.exports=route;