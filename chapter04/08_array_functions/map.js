
const paintings = [
  {title: "Girl with a pearl earring", artist: "Vermeer", value: 10},
  {title: "Artists Holding a Thristle", artist: "Durer", value: 7},
  {title: "Wheat field with Crows", artist: "Van Gogh", value: 16},
  {title: "Burial at Ornans", artist: "Courbet", value: 18},
  {title: "Wheat field with Crows", artist: "Van Gogh", value: 9}
];

const vg = paintings.filter( p => p.artist === 'Van Gogh');
const newPaintings = vg.map( p => {
  p.value += 10;
  return p;
});

console.log(paintings);
console.log(newPaintings);