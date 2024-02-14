const http = require('http');
const fs = require('fs');
const url = require('url');
http.createServer((req,res)=>{
    const parsedUrl = url.parse(req.url,true);
    console.log(parsedUrl);
    if(parsedUrl.pathname=='/api/products'){
        let data = JSON.parse(fs.readFileSync('./products.json','utf-8'));
        res.setHeader('Content-Type','application/json');
        res.setHeader('Access-Control-Allow-Origin','*')
        res.statusCode = 240;
        res.statusMessage = 'Data served';        
        const product = data.filter(product=>{
            return product.name.toUpperCase() == parsedUrl.query.name.toUpperCase();
        })
        res.end(JSON.stringify(product));
    }
    else{
        res.end('Invalid request');
    }
}).listen(8080);