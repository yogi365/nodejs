const http = require('http');
const fs = require('fs');
http.createServer((req,res)=>{
    if(req.url=='/todo.html'){
        const todo = fs.readFileSync('./public/view/todo.html');
        res.setHeader('Content-Type','text/html');
        res.end(todo);
    }
    if(req.url=='/addTask'){
        const taskArray = JSON.parse(fs.readFileSync('./public/task.json','utf-8'));
        let taskData = '';
        
        req.on('data',(chunk)=>{
            console.log(chunk);
            taskData += chunk;
        })
        req.on('end',()=>{
            taskArray.push(JSON.parse(taskData));
            fs.writeFileSync('./public/task.json',JSON.stringify(taskArray));
        })
        res.end('Data added Successfully');   
     }

}).listen(4040)