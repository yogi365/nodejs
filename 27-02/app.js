const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.listen(8080);

// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended:true}));

app.use((req,res,next)=>{
    console.log(req.hostname);
    const time = new Date()
    console.log(time)
    next();
})

app.get('/user/:name/:email',(req,res)=>{
    console.log(req.params);
    res.send(req.params)
})

app.use((req,res,next)=>{
    console.log(req.url);
    const time = new Date()
    console.log(time)
    next();
})

// app.post('/user',(req,res)=>{
//     console.log(req.body);    
//     res.send("hello");
// })