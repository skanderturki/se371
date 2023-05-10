// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)
const names = require('./mod-names.js');
const utils = require('./mod-utils.js');

utils.sayHello('mounir')
utils.saySelem(names.first_name)

