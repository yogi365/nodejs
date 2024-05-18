// routes/employees.js
const express = require('express');
const multer = require('multer');
const Employee = require('../models/employees');
const path = require('path');

const routes = express.Router();

const storage = multer.diskStorage({
    destination: './public/images',
    filename: function (req, file, cb) {
        const fileName = Date.now() + "" + file.originalname;
        cb(null, fileName);
    }
});
const upload = multer({
    storage: storage
});

routes.get('/add', (req, res) => {
    res.render('./addData');
});

routes.get('/edit/:id', async (req, res) => {
    const empData = await Employee.findOne({id:req.params.id});
    if(empData){
        res.render('./editdata',{empData});
    }
    
});

routes.get('/', async (req, res) => {
    let empData = await Employee.find({});
    if(!empData){
        empData = [];
    }
    console.log(path.join('./','../'))
    res.render('./showdata',{empData});
});

routes.post('/add', upload.single('profilePic'), async (req, res) => {
    let empData = await Employee.find({}).sort({ id: -1 });
    let id = 1001;
    console.log(req.file);
    console.log(empData);
    if (empData.length > 0) {
        id = Number(empData[0].id) + 1;
    }
    
    const emp = new Employee({
        id: id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        dob: req.body.dob,
        salary: req.body.salary,
        address: req.body.address,
        profilePic:req.file.filename
    })

    const response = await emp.save();
    // console.log(response)
    res.redirect('/emp')
});

module.exports = routes;
