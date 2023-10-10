function Employee (position, fname, lname, email) {
  this.position = position;
  this.fname = fname;
  this.lname = lname;
  this.email = email;
  this.toHTMLArticle = () => `<article><h2>Position: ${this.position}</h2><p>Name: ${this.fname}</p>
                    <p>Last Name: ${this.lname}</p><p>Email: ${this.email}</p></article>`;
}

let makeArticle = (nodeId, position, fname, lname, email) =>  {
  let node = document.getElementById(nodeId);
  let employee = new Employee(position, fname, lname, email);
  node.innerHTML = employee.toHTMLArticle();
}

let getValueByID = (nodeId) => {
  let node = document.getElementById(nodeId);
  if(node){
    return node.value;
  }
  return null;
}

