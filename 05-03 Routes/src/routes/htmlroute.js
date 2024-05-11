module.exports = (function(){
    const route = require('express').Router();

    route.get('/home',(req,res)=>{
        res.send('Hello');
    })

    return route;
})();