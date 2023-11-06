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

// chain promises aync/await
const start = async () => {
  try {
    const first = await getText('./content/first.txt', 'utf8')
    const second = await getText('./content/second.txt', 'utf8')
    await writeText('./content/result-await.txt', `${first} ${second}` + "\n",
      { flag: 'a' }
    )
    console.log(first, second)
  } catch (error) {
    console.log(error)
  }
}

start();


