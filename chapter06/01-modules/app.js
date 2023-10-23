// CommonJS, every file is a module (by default)
// Modules - Encapsulated Code (only share minimum)
const names = require('./mod-names.js');
const saySelem = require('./mod-utils.js');

saySelem(names.first_name);

saySelem(names.secret); // secret is not exported

