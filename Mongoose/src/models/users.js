const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    lastName:String,
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:String,
    age:{
        type:Number,
        min:10,
        max:[20,'Age is more than 20'],
        default:10
    },
    hobbies:[String],
    firstName:String
});

const Users = mongoose.model('users',usersSchema);

module.exports = Users;