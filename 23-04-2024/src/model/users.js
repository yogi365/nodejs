const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    userName:{
        type:String,
        unique:true
    },
    password:String,
    age:Number,
    hobbies:[String]
})

const User = mongoose.model('users',userSchema);
module.exports = User;