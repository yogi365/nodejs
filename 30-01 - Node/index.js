const http = require('http');
const fs = require('fs')
const server = http.createServer((req,res)=>{
    if(req.url=='/about'){
        res.setHeader('Content-Type','text/html')
        let data = fs.readFileSync('./view/about.html','utf-8')
        res.write(data)
        res.end(); 
    }
    else if(req.url=='/home'){
        res.setHeader('Content-Type','text/html')
        let data = fs.readFileSync('./home.html','utf-8')
        res.write(data)
        res.end(); 
    }
    else{
        res.setHeader('Content-Type','text/html')
        res.write('<b>Page Not Found</b>');
        res.end(); 
    }
    
})

server.listen(3030,()=>{
    console.log('server started')
})