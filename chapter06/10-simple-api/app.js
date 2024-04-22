// first reference required modules

const express = require('express');
require('dotenv').config();
const getData = require("./file_utils");
const app = express();

// return the curriculum when a root request arrives
app.get('/', (req, resp) => { resp.json(getData()) } );


app.route('/level')
	.get( (req, res) => {  
		res.json({ name: `${req.query.first} ${req.query.last}`});
	}).post( (req, res) => {  
		res.json({ name: `${req.query.first} ${req.query.last}`});
	});

app.get( '/echo/:word', (req, res) => {
	let param = req.params.word;
	res.json( { echo: param } );  //use the variable as needed
});

app.post( '/echo/:word', (req, res) => {
	let param = req.params.word;
	res.json( { echo: param } );  //use the variable as needed
});


app.use( (request, response) => {
  response.status(404).send("<h1>404 Error</h1>");
});


app.listen(process.env.PORT, () => {
	console.log("Server running at port: " + process.env.PORT);
});
