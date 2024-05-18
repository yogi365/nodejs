const mongoose=require("mongoose");
const user=mongoose.Schema({
    name:String,
    password:String,
})

module.exports=mongoose.model("users",user);