const express = require('express');
const app = express();
const bodyParse = require('body-parser');
const cors = require('cors');

app.use(express.static('./public'))
// app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended:false}))
app.use(cors())

app.get('/',(req,res)=>{
    res.sendFile('./view/home.html',{root:'./'})
});

app.get('/url',(req,res)=>{
    console.log(req.body);
    res.send('Hello')
})

app.get('/about',(req,res)=>{
    res.sendFile('./view/about.html',{root:'./'})
});

app.get('/contact',(req,res)=>{
    res.sendFile('./view/contact.html',{root:'./'})
});

app.post('/demo',(req,res)=>{
    console.log(req.body); 
    res.json("{'message':'Message recived'}")   
})

app.get('*',(req,res)=>{
    res.send('<h1>Page not found</h1>')
})

app.listen(8080);