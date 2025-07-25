const mongoose = require('mongoose');
const Schema = mongoose.schema;

const employeeSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Employee', employeeSchema);