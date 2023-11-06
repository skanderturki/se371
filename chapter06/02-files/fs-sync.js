const { readFileSync, writeFileSync } = require('fs');

console.log('start');

const first = readFileSync('./content/first.txt', 'utf8');
console.log('Task 1 completed!');

const second = readFileSync('./content/second.txt', 'utf8');
console.log('Task 2 completed!');

writeFileSync(
  './content/result.txt',
  `Here is the result : ${first}, ${second}\n`,
  { flag: 'a' }
);
console.log('Task 3 completed!');



