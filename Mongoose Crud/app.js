const express = require('express');
const app = express();
app.listen(8080);
const mongoose = require('mongoose');
app.use(express.static('./public'))

app.set('view engine','ejs');
app.set('views','./src/views')

const uri = 'mongodb+srv://demoUser:user123@cluster0.kjhkths.mongodb.net/Employee?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri);

const employeesRoute = require('./src/routes/employees');

app.use('/emp',employeesRoute);