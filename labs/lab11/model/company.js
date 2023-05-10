const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
  code: {type: String, required: true},
  name: {type: String, required: true},
  address: {type: String},
  description: {type: String},
  capital: {type: Number},
  owner: {type: String}
});

module.exports = mongoose.model('Company', companySchema);