const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    if(req.url=='/demo.json'){
        res.setHeader('Content-Type','application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');                         
        res.statusCode=200;        
        let data = fs.readFileSync('./demo.json','utf-8');
        res.write(data)
        res.end();
    }
    else{
        res.setHeader('Content-Type','text/plain');
        res.statusCode=404;
        res.statusMessage = 'Resource not found'
        res.write('Resource not found');
        res.end();
    }

});

server.listen(8080)