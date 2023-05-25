const mongoose = require('mongoose');

let itemSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String},
  filename: {type: String, required: true}
});

module.exports = mongoose.model('Item', itemSchema);