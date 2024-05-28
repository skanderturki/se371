var mysql      = require('mysql2');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'se371',
  password : 'se371_232',
  database : 'world'
});

connection.connect();

connection.query('SELECT * from city', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});