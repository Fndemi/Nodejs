//HTML,CSS, and Javascript
//how Node.js differs from vanilla JavaScript
//Node runs on the server side, while JavaScript runs in the browser
//the console is the terminal window
//global object instead of window object
//CommonJS modules instead of ES6 modules
//require() instead of import
//module.exports instead of export
console.log("Hello, World!");
// console.log(global);


const os = require('os');
const path = require('path');
const { add, subtract, multiply, divide } = require('./math');

console.log(add(2, 3));
console.log(subtract(2, 3));
console.log(multiply(2, 3));
console.log(divide(2, 3));
// console.log(os.type()); // Returns the operating system name

// console.log(os.version()); // Returns the operating system name

// console.log(os.homedir()); // Returns the operating system name

// console.log(__dirname);
// console.log(__filename);

// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));

// console.log(path.parse(__filename));
