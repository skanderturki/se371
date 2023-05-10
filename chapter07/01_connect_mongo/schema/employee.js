const mongoose = require('mongoose');

let employeeSchema = new mongoose.Schema({
  name: { type: String, required: true},
  age: { type: Number},
  positions: { type: [String]}    // The type here is an array of strings.
});

// Now export the schema to be used by the app
// 'Employee' chaged to plural automatically will be the name of the collection in the database
// man -> men, person -> people, etc......
module.exports = mongoose.model('Employee', employeeSchema);
