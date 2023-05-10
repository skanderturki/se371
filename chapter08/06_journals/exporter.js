const { readFile, writeFile } = require('fs');


// create a promise for write (flag should be 'a' for append)
const writeText = (path, text, flag) => {
  return new Promise((resolve, reject) => {
    writeFile(path, text, { flag: flag }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}


// chain promises aync/await
const write = async (journal) => {
  try {
    journal._id = undefined;
    await writeText('./data.js', journal + ",\n", 'a')
  } catch (error) {
    console.log(error)
  }
}

module.exports = { write };


