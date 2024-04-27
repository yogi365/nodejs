const express = require('express');
const app = express();
app.listen(8080);
const session = require('express-session');

const {MongoClient} = require('mongodb');

app.use(express.static('./public'))

const client = new MongoClient('Enter your uri')

app.use(session({
    secret:'secretkey',
    resave:false,
    saveUninitialized:true
}));

app.get('/login',(req,res)=>{
    res.sendFile('login.html',{root:'./views'});
})

app.get('/register',(req,res)=>{
    res.sendFile('register.html',{root:'./views'});
})

app.get('/home',(req,res)=>{
    res.sendFile('/home.html',{root:'./views'});
})

const userAuth = (req,res,next)=>{
    if(req.session && req.session.user){
        next();
    }
    else{
        res.redirect('/login')
    }
}

app.post('/login',async (req,res)=>{
    await client.connect();
    const user = await client.db('databaseName').collection('collection').findOne({username:req.body.username, password:req.body.password})
    await client.close();
    
    if(!user){
        res.status(401).send('Invalid Username or password');
    }else{
        res.session.user = user;
        res.redirect('/home');
    }
})

app.post('/register',async(req,res)=>{
    await client.connect();
    const result = await client.db('databaseName').collection('collection').insertOne({
        fullname:req.body.fullname,
        username:req.body.username,
        password:req.body.password,
        email:req.body.email
    });

    await client.close();

    if(result.acknowledged){
        res.redirect('/login')
    }else{
        res.status(400).send('Something went wrong');
    }
})
