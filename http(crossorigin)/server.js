const http = require('http');
const fs = require('fs');
//const path = require('path');
const url = require('url');

const server=http.createServer((req,res)=>{
    console.log("done");
    res.setHeader('Content-Type','application/json');
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');

    let path = url.parse(req.url,true);

    if(path.pathname=='/product'){     
        
        res.statusCode=200;
        res.statusMessage = 'Ok';
        let data = fs.readFileSync(__dirname+'/product.json','utf-8'); 
        let products = JSON.parse(data);
        let result = products.filter(product=>{
            return product.name == path.query.name
        })            
        res.write(JSON.stringify(result));
        res.end();
    }
    else{
        res.setHeader('Content-Type','text/plain');
        res.statusCode=404;
        res.statusMessage = 'Not found';
        res.end();
    }
})
server.listen(8080,(err)=>{
    if(err)
    console.log(err)
else
console.log("server started");
})

