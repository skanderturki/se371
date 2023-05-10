// first reference required modules
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use( cors({
    allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    exposedHeaders: ["authorization"], // you can change the headers
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  })
)

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
app.get('/countries', (req,resp) => { 
	resp.setHeader("Access-Control-Allow-Origin", "*");
  resp.setHeader('Access-Control-Allow-Methods', '*');
  resp.setHeader("Access-Control-Allow-Headers", "*");
	resp.json(datajson.countries) } );

// return the curriculum when a root request arrives
app.get('/employees', (req,resp) => { 
	resp.setHeader("Access-Control-Allow-Origin", "*");
  resp.setHeader('Access-Control-Allow-Methods', '*');
  resp.setHeader("Access-Control-Allow-Headers", "*");
	resp.json(datajson.employees) } );

app.listen(process.env.PORT, () => {
	console.log("Server running at port= " + process.env.PORT);
});
