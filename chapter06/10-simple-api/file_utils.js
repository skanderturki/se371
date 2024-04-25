const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'data', 'SE2022.json');

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