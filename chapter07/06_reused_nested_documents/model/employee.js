const mongoose = require('mongoose');

let projectSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String }
});

let employeeSchema = new mongoose.Schema({
  name: { type: String, required: true},
  age: { type: Number},
  positions: { type: [String]},   // The type here is an array of strings.
  projects:  [projectSchema]
});

const Employee = mongoose.model('Employee', employeeSchema);
const Project = mongoose.model('Project', projectSchema);

module.exports = { Employee, Project };
