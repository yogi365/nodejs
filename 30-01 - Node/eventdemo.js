const EventEmiter = require('events');
const event = new EventEmiter();

event.on('eventCalled',()=>{
    console.log('An event is called')
})

event.emit('eventCalled');