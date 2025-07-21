const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
console.log(format(new Date(), 'yyyy-MM-dd HH:mm:ss')) // Outputs the current date and time in a formatted string

console.log(uuid())
