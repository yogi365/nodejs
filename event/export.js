const EventEmitter=require("events");
const eventEmitter=new EventEmitter();
function log(){
    eventEmitter.emit("start","hello");
}

module.exports={eventEmitter,log};
