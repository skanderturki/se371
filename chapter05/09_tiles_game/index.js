const table_columns = ['A', 'B', 'C', 'D', 'E', 'F'];

const createHeaderRow = () => {
  // Build table header : * A B C D E F
  const thead = document.getElementById("table_head");
  const tr = document.createElement("tr");
  tr.appendChild(createNodeOfTypeWithText("th", "", "border"));
  for(let c of table_columns){
    tr.appendChild(createNodeOfTypeWithText("th", c, "border"));
  }
  thead.appendChild(tr);
}

const createTableBody = () => {
  const tbody = document.getElementById("table_body");
  for(let i = 0; i < table_columns.length; i++){
    const tr = document.createElement("tr");
    tr.appendChild(createNodeOfTypeWithText("th", i+1, "border", "table_cell"));
    for(let j = 1; j <= table_columns.length; j++){
      tr.appendChild(createNodeOfTypeWithText("td", " ", "border", "table_cell"));
    }
    tbody.appendChild(tr);
  }
}

// A function that creates a new node of the given type 
// with the given textual node then it applies the given classes to the node
// and returns that new node
const createNodeOfTypeWithText = (type, text, ...classNames) => {
  const node = document.createElement(type);
  if(!node) throw new Error(`Unable to create HTML element of type ${type}`);
  node.appendChild(document.createTextNode(text));
  if(classNames){
    for(let cname of classNames){
      node.classList.add(cname);
    }
  }
  return node;
}

document.addEventListener("DOMContentLoaded", () => {
  createHeaderRow();
  createTableBody();

  const table_cells = document.querySelectorAll("tbody td");
  for(let td of table_cells){
    td.addEventListener("mouseover", () => {
      td.classList.add("background_blue");
    });
    td.addEventListener("mouseout", () => {
      td.classList.remove("background_blue");
    });
  }
})



