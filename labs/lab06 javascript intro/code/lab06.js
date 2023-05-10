
let i = 0;
const arr = [];
for(let d of data) {
  arr[i++] = JSON.parse(d);
}

const Customer = function (id, name, lastname, address) {
  this.id = id,
  this.name = name,
  this.lastname = lastname,
  this.address = address,
  this.output = () => { return this.id + " " + this.name + " " + this.lastname + ": "
                              + this.address.nb + " " + this.address.street + ", " 
                              + this.address.city;
                      }
}

// Create new Cutomer
const c1 = new Customer( 45, "Faleh", "Farabi", { nb: 25, street: "Souleimaniyya", city: "Jazan"});
console.log("New object created:" + c1.output());

// Add new Customer to array
arr[arr.length] = c1;

// Add the output function to the old objects
for( o of arr){
  o.output = () => { return o.id + " " + o.name + " " + o.lastname + ": "
                    + o.address.nb + " " + o.address.street + ", " 
                    + o.address.city;
  }
  console.log(o);
}

// Notice that this code would give a counter-intuitive result.
// for( o of arr){
//   o.output = c1.output;
//   console.log(o);
// }

for( o of arr){
  console.log(o.output());
}

