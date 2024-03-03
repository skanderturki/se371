
function funcA(a) {
  return a * a;
};

function funcA(a, b) {
  return a*a + b*b;
}

// Here the second function is called with b = undefined -> we get NaN
console.log( funcA(2) );

//Conclusion: No overloading in javascript (until 26/02/2023)