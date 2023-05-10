
let employee = function (name, lastname) {
  this.name = name,
  this.lastname = lastname,
  this.toString = function () { return this.name + " " + this.lastname; }
};

let s = new employee("Salah", "Abed");
//console.log(`${s}`);
// or
console.log(s.toString());