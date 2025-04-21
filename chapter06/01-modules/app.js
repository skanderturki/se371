// CommonJS, every file is a module (by default)
// Modules - Encapsulated Code (only share minimum)
const names = require('./mod-names.js');
const utils = require('./mod-utils.js');

utils.saySelem(names.first_name);

utils.saySelem(names.secret); // secret is not exported

