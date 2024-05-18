const mongoose = require('mongoose');
const empSchema = new mongoose.Schema({
    id:{
        type:Number,
        unique:true,
        require:true,
        min:1001
    },
    firstName:{
        type:String,
        require:true
    },
    lastName:String,
    email:{
        type:String,
        unique:true,
        require:true
    },
    contactNumber:{
        type:Number,
        require:true,
        min:1000000000,
        max:9999999999
    },
    
    dob:{
        type:Date
    },
    salary:{
        type:Number,
        require:true,
        min:1
    },
    address:{
        type:String
    },
    profilePic:{
        type:String
    }
},{
    collection:"employees"
})

const Employee = mongoose.model('employees',empSchema);

module.exports = Employee;