const http = require('http');
const fs = require('fs');
http.createServer(async (req,res)=>{
    if(req.url == '/demo.json'){
        let data = '';
        await req.on('data',(chunk)=>{
                data+=chunk;
        });        
        const demoData = JSON.parse(fs.readFileSync('./demo.json','utf-8')); 
        data = JSON.parse(data);
        const filteredData = demoData.filter((demo)=>
        {                       
            return data.roll == demo.roll
        }
        )
        res.setHeader('Content-Type','application/json');
        res.setHeader('Access-Control-Allow-Origin','*')
        res.end(JSON.stringify(filteredData));
    }
}).listen(8080)