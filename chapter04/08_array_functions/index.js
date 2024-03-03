
const paintings = [
  {title: "Girl with a pearl earring", artist: "Vermeer", value: 10},
  {title: "Artists Holding a Thristle", artist: "Durer", value: 7},
  {title: "Wheat field with Crows", artist: "Van Gogh", value: 16},
  {title: "Burial at Ornans", artist: "Courbet", value: 18},
  {title: "Wheat field with Crows", artist: "Van Gogh", value: 9}
];

console.log("Van Gogh only paintings:");
const vg = paintings.filter( p => p.artist === 'Van Gogh');
vg.forEach( p => console.log(p) );

console.log("Total value of paintings is:");
let initial = 0;
const total = paintings.reduce( (prev, p) => prev + p.value, initial );
console.log( total );

console.log("All paintings sorted by value:")
const compareFn = (a, b) => a.value - b.value;
const sorted = paintings.sort(compareFn);
sorted.forEach((e) => { console.log(e); });

console.log("All paintings in uppercase:")
const mapped = paintings.map( p => `${p.title.toUpperCase()} : ${p.artist.toUpperCase()}`);
mapped.forEach((e) => { console.log(e); });
