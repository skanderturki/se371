// Method 1 to create an object
const transportMethodA = {
  id: "001",
  name: "Plane",
}

console.log(transportMethodA);

// Method 2 to create an object
const transportMethodB = new Object();
transportMethodB.id = "002";
transportMethodB["name"] = "Train";

console.log(transportMethodB);