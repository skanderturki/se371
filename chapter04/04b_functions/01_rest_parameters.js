// Example 1
const sum = function (...args) {
  let s = 0;
  for(n of args){
    s += n;
  }
  return s;
};

console.log(sum(1,2,3,4,5,6,7,8,9));

// Example 2
const product = function (quantity, price) {
  return quantity * price;
}

const total = function (f, ...args) {
  let s = 0;
  for(n of args){
    s += f(n[0], n[1]);
  }
  return s;
};

console.log(total(product, [10, 12], [3, 20], [5, 75], [6, 25]));

