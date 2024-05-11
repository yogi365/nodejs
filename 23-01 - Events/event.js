const event = require('events');
const emiter = new event();
const http = require('http');
const server = http.createServer((req,res)=>{

});


server.listen(3030);

emiter.on('logeMessage',()=>{
    console.log('event Listened');
})

emiter.on('connect',()=>{
    console.log('Connected')
})
emiter.emit('logeMessage');