const express = require('express');
const app = express();
const session = require('express-session');
const bodyparser = require('body-parser');
app.listen(8080);

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json())

app.use(session({
    secret:'secret',
    resave: false,    
    saveUninitialized:true
}))

app.get('/login',(req,res)=>{
    res.sendFile('login.html',{root:'./public'});
})

const userAuth = (req,res,next)=>{
    console.log(req.body)
    if(req.body.name=='abc' && req.body.pass=='abc'){
        next()
    }
    else{
        res.send('Invalid username or password')
    }
}

app.post('/login',userAuth,(req,res)=>{
    res.send('valid user');
})

// var count = 0;
// app.get('/view',(req,res)=>{
//    if(req.session.count){
//         req.session.count++;
//    } 
//    else{
//     req.session.count = 1;
//    }
//    console.log(req.session)
//    res.send(`Count is ${req.session.count} <br> ${req.session.id}`);
// })