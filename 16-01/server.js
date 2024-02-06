const http = require('http');
const fs = require('fs')
const server = http.createServer((req,res)=>{
    
    if(req.url=='/quiz'){
        const question = fs.readFileSync('./Component/Model/question.json');        
        res.write(question.toString())
    }
    else{
        res.write('home page')
    }
    
    res.end();
})
server.listen(8080);