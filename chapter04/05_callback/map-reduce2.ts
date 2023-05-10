
let sum2 = (arr: number[]) : number => { 
  let s = 0; 
  for (let e of arr) { 
    s += e 
  }; 
  return s 
};

let map2 = (f, arr: number[][]) : number[] => { 
  let res: number[] = [], i = 0; 
  for (let e of arr) { 
    res[i] = f(e); 
    i++; 
  }; 
  return res;
};

let arr2: number[][] = [[2, 3], [4, 6, 7], [8, 2], [89, 12]];

console.log(map2(sum2, arr2));