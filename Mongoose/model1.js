const mongoose=require("mongoose");
const user=mongoose.Schema({
  name:String,
  price:Number,
  desc:String,

})

module.exports=mongoose.model("products",user);