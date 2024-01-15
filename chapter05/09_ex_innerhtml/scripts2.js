
  this.getHTMLArticle = () => {
                                return  `<article><h2>Position: ${this.position}</h2>
                                <p>Name: ${this.fname}</p>
                                <p>Last Name: ${this.lname}</p>
                                <p>Email: ${this.email}</p>
                                </article>`;
  }


let makeArticle = (nodeId, position, fname, lname, email) => {

  let h2 = document.createElement("h2");
  let articleContent = document.createTextNode(`Position: ${this.position}`);
  h2.appendChild(articleContent);
  
  let nameNode = document.createElement("p");
  let nameContent = document.createTextNode(`Name: ${this.fname}`);
  nameNode.appendChild(nameContent);

  let lastNameNode = document.createElement("p");
  let lastNameContent = document.createTextNode(`Last Name: ${this.lname}`);
  lastNameNode.appendChild(lastNameContent);

  let emailNode = document.createElement("p");
  let emailContent = document.createTextNode(`Email: ${this.email}`);
  emailNode.appendChild(emailContent);

  let article = document.createElement("article");
  article.appendChild(h2);
  article.appendChild(nameNode);
  article.appendChild(lastNameNode);
  article.appendChild(emailNode);

  let node = document.getElementById(nodeId);
  node.appendChild(article);
}

let getValueByID = (inputNodeId) => {
  let node = document.getElementById(inputNodeId);
  return node.value;
}