const mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
  name: {type: String, required: true},
  code: {type: String, required: true},
  description: {type: String}
});

module.exports = mongoose.model('Article', articleSchema);