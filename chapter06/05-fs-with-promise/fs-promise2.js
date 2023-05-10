const { writeFile, readFile } = require('fs');

console.log('Starting task A...');


const readPromise = (fileToRead, encoding) => {
  return new Promise((resolve, reject) => {
    readFile('./content/first.txt', 'utf8', (err, data) => {
      if(err){
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
}

const writePromise = (fileToWrite, newContent, flag) => {
  return new Promise((resolve, reject) => {
      writeFile(fileToWrite, newContent, flag, (err) => {
        if(err){
          reject(err);
        } else {
          resolve(true);
        }
      });
  })
}

readPromise('./content/first.txt', 'utf8')
  .then((result) =>{
    writePromise('./content/result.txt', `${result}\n`, { flag: 'a' });
  })
  .catch((err) => {
    console.log(err);
  })

console.log('starting next task...');
