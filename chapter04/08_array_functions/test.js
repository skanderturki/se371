const paintings = [
  { title: "Girl with a pearl earring", artist: "Vermeer", value: 10 },
  { title: "Artists Holding a Thristle", artist: "Durer", value: 7 },
  { title: "Wheat field with Crows", artist: "Van Gogh", value: 16 },
  { title: "Burial at Ornans", artist: "Courbet", value: 18 },
  { title: "Wheat field with Crows", artist: "Van Gogh", value: 9 }
];

const results = paintings.sort((p1, p2) => {
  if(p1.artist > p2.artist) return 1
  else if(p1.artist < p2.artist) return -1;
  else return 0;
});

console.log(results);