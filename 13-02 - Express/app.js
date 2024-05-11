const express = require('express');
const app = express();
app.use(express.static('public'));
app.use('cors')

app.get('/home.html',(req,res)=>{
    res.sendFile('./view/home.html',{root:__dirname});
});

app.get('/about.html',(req,res)=>{
    res.sendFile('./view/about.html',{root:__dirname});
})

app.get('/contact.html',(req,res)=>{
    res.sendFile('./view/contact.html',{root:__dirname});
})

app.listen(8080,(err)=>{
    if(err) throw err;
    console.log('Server started at 8080');
})

