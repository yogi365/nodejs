const express = require('express');
const app = express();
const session = require('express-session');
const bodyparser = require('body-parser');
const userRouter = require('./src/routes/user');
const adminRouter = require('./src/routes/admin');
app.listen(8080);

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json())

app.use(session({
    secret:'secret',
    resave: false,    
    saveUninitialized:true
}))

const users = [
    {username:'abc',pass:'abc',role:'admin'},
    {username:'xyz',pass:'xyz',role:'user'}
]

const userAuth = (req,res,next)=>{
    if(req.session && req.session.user){
        next();
    }
    else{
        res.redirect('/login');
    }    
}

const authorisation = (req,res,next)=>{
    if(req.session.user.role=='admin'){
        next();
    }
    else{
        res.send('Invalid access')
    }
}

app.use('/admin',userAuth,authorisation,adminRouter);
app.use('/user',userAuth,userRouter);

app.post('/login',(req,res)=>{
   const user = users.find(user=>req.body.name==user.username && req.body.pass == user.pass);
   if(user){
    req.session.user=user;
    res.redirect('/');
   }
   else{
    res.send('invalid username or password');
   }
})

app.get('/',(req,res)=>{
    res.sendFile('home.html',{root:'./public'});
})


app.get('/login',(req,res)=>{
    res.sendFile('login.html',{root:'./public'});
});

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})

