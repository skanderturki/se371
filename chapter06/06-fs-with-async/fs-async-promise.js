const { readFile, writeFile } = require('fs')

// create a promise for read
const getText = (path, encoding) => {
  return new Promise((resolve, reject) => {
    readFile(path, encoding, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// create a promise for write
const writeText = (path, text) => {
  return new Promise((resolve, reject) => {
    writeFile(path, text, { flag: 'a' }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// // chain promises 
let first, second;
getText('./content/first.txt', 'utf8')
.then((data) => {
  first = data;
  getText('./content/second.txt', 'utf8')
  .then((data) => {
    second = data;
    writeText('./content/result-await.txt', `${first} ${second}` + "\n", { flag: 'a' });
  })
})
.catch((error) => console.log(error));



