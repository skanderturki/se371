const { readFile, writeFile } = require('fs');

console.log('Starting task A...');

readFile('./content/first.txt', 'utf8', (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
 
  writeFile('./content/result-async.txt', `Here is the Async result : ${result}\n`, { flag: 'a' },
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('Task A completed!');
      }
  )
})

console.log('starting next task...');
