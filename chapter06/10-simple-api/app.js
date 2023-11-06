// first reference required modules
const fs = require('fs');
const path = require('path');
const express = require('express');
require('dotenv').config();

const app = express();

// for now, we will read a json file from the data folder
const jsonPath = path.join(__dirname, 'data', 'SE2022.json');
// get data using conventional Node callback approach
let curriculum;

fs.readFile(jsonPath, (err,data) => {
	if (err)
		console.log('Unable to read json data file');
	else
  curriculum = JSON.parse(data);
});

// return the curriculum when a root request arrives
app.get('/', (req, resp) => { resp.json(curriculum) } );


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

app.listen(process.env.PORT, () => {
	console.log("Server running at port: " + process.env.PORT);
});
