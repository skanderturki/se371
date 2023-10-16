let makeArticle = (nodeId, position, fname, lname, email) => {
  
  let h2 = document.createElement("h2");
  let h2Content = document.createTextNode(`Position: ${position}`);
  h2.appendChild(h2Content);

  let p1 = document.createElement("p");
  let p1Content = document.createTextNode(`Name: ${fname}`);
  p1.appendChild(p1Content);

  let p2 = document.createElement("p");
  let p2Content = document.createTextNode(`Last Name: ${lname}`);
  p2.appendChild(p2Content);

  let p3 = document.createElement("p");
  let p3Content = document.createTextNode(`Email: ${email}`);
  p3.appendChild(p3Content);

  let article = document.createElement("article");
  article.appendChild(h2);
  article.appendChild(p1);
  article.appendChild(p2);
  article.appendChild(p3);

  let node = document.getElementById(nodeId);
  node.appendChild(article);
}

let getValueByID = (inputNodeId) => {
  let inputNode = document.getElementById(inputNodeId);
  if(inputNode) return inputNode.value;
  return `Element with id ${inputNodeId} not found!!`;
}