const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

//Iniialize the object 
const myEmitter = new MyEmitter();
//add listener for the log event
myEmitter.on('log', (msg) => logEvents(msg));
setTimeout(() => {
  //Emit event
  myEmitter.emit('log', 'Log event emitted!')
}, 2000);