const express = require('express');
const app = express();
const fs = require('fs');
app.listen(8080);
app.set('view engine','ejs');
app.use(express.static('./public'))

app.get('/',(req,res)=>{
    const users = JSON.parse(fs.readFileSync('./users.json')).users;
    res.render('home.ejs',{users});
})