const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
http.createServer((req,res)=>{
    const urllink = req.url;
    const data = url.parse(urllink,true);    
    let fname = data.query.fname;
    
    if(req.url=='/product'){
        res.setHeader('Content-Type','application/json');
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        res.statusCode=200;
        res.statusMessage = 'Ok';
        let data = fs.readFileSync('./products.json','utf-8');
        let a = await fetchData();
        res.write(data);
        res.end();
    }
    else{
        res.setHeader('Content-Type','text/plain');
        res.statusCode=404;
        res.statusMessage = 'Not found';
        res.end();
    }
}).listen(3030);

