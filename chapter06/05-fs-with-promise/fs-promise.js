const { readFile, writeFile } = require('fs')

console.log('start')

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

read('./content/first.txt')
  .then((data)=> console.log(data))
  .catch((err)=> console.log(err));


