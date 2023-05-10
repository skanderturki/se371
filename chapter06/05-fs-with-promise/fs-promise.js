const { readFile, writeFile } = require('fs');
const path = require('path');
const filePath = path.join(__dirname, "\\content\\first.txt");

console.log('start');

const read = (path) => {
  return new Promise((resolve, reject)=>{
    readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

read(filePath)
  .then((data)=> console.log(data))
  .catch((err)=> console.log(err));


