const employee = {
  id: "0023",
  name: "skander",
  address: {
    nb: 12,
    street: "faycaliyya street",
    city: "riyadh",
    country: "KSA",
    output: function() { return this.nb + " " + this.street + ", " 
                        + this.city + ", " + this.country; },
  },

};

console.log( employee.address.output() );