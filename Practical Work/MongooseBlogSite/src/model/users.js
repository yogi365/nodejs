const mongoose = require('mongoose');
const userSchema =new mongoose.Schema({
        
        "firstName": String,
        "lastName": String,
        "age":Number,
        "gender": String,
        "email": {
            type:String,
            unique:true,
            require:true
        },
        "phone": Number,
        "username": {
            type:String,
            unique:true,
            require:true
        },
        "password": {
            type:String,
            unique:true,
            require:true,
            maxlength:18,
            minlength:6
        },
        "role": {
            type:String,           
            require:true
        }
});

const User = mongoose.model('users',userSchema);

module.exports = User;