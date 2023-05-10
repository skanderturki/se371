
let sum = (arr) => { 
  let s = 0; 
  for (let e of arr) { 
    s += e 
  }; 
  return s 
};

let map = (f, arr) => { 
  let res = [], i = 0; 
  for (let e of arr) { 
    res[i] = f(e); 
    i++; 
  }; 
  return res 
};

let arr = [[2, 3], [4, 6, 7], [8, 2], [89, 12]];

console.log(map(sum, arr));