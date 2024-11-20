
const paintings = [
  {title: "Girl with a pearl earring", artist: "Vermeer", value: 10},
  {title: "Artists Holding a Thristle", artist: "Durer", value: 7},
  {title: "Wheat field with Crows", artist: "Van Gogh", value: 16},
  {title: "Burial at Ornans", artist: "Courbet", value: 18},
  {title: "Wheat field with Crows", artist: "Van Gogh", value: 9}
];

// sorts and produces a new sorted array without modifying the original
const sorted = paintings.toSorted((p1, p2) => p1.value - p2.value);

// sorts the original in-place
//paintings.sort((p1, p2) => p1.value - p2.value);

console.log(paintings);
console.log(sorted);
