// first reference required modules
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors()); // cors allows to access api through javascript;

// for now, we will read a json file from the data folder
const jsonPath = path.join(__dirname, 'data', 'data.json');
// get data using conventional Node callback approach
let datajson;

fs.readFile(jsonPath, (err,data) => {
	if (err)
		console.log('Unable to read json data file');
	else
  datajson = JSON.parse(data);
});

// return the curriculum when a root request arrives
app.get('/countries', (req,resp) => { resp.json(datajson.countries) } );

// return the curriculum when a root request arrives
app.get('/employees', (req,resp) => { resp.json(datajson.employees) } );

app.listen(process.env.PORT, () => {
	console.log("Server running at port= " + process.env.PORT);
});
