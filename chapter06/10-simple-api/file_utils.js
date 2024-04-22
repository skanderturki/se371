const fs = require('fs');
const path = require('path');


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

const getData = () => {
  return curriculum;
}

module.exports = getData;