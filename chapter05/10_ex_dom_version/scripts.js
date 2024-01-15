

// Question 1
const makeArticle = function (idOfTarget, position, name, lastName, email) {
  let element = document.getElementById(idOfTarget);
  element.innerHTML = "";
  let art = document.createElement("article");
  let h2 = document.createElement("h2");
  h2.appendChild( document.createTextNode('Position: ' + position) );
  let p1 = document.createElement("p");
  p1.appendChild( document.createTextNode('Name: ' + name) );
  let p2 = document.createElement("p");
  p2.appendChild( document.createTextNode('Last Name: ' + lastName ) );
  let p3 = document.createElement("p");
  p3.appendChild( document.createTextNode('Email: ' + email) );

  art.appendChild(h2);
  art.appendChild(p1);
  art.appendChild(p2);
  art.appendChild(p3);
  element.appendChild(art);
}

function createElementWithText(type, text){
  let elm = document.createElement(type);
  elm.appendChild( document.createTextNode(text) );
  return elm;
}

// If the lement with the given id is found we return its value otherwise we return a message.
function getvalue(id) {
  let element = document.getElementById(id);
  if(element)
    return element.value; 
  else
    throw new Error(`Element with id: ${id} not found!`);
}

// Clears the element that has the given id if any.
function clearElementByID(id){
  let element = document.getElementById(id);
  if(element)
    element.removeChild(p.firstElementChild);
  else
    throw new Error(`Element to clear with id: ${id} not found!`);
}

