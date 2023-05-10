

// Question 1: create an article using innerHTML
const makeArticle = function(displayElement, position, name, lastName, email) {
  let s = '<article><h2>Position: ' + position + '</h2>'
          + '<p>Name: ' + name + '</p>'
          + '<p>Last Name: ' + lastName + '</p>'
          + '<p>Email: ' + email + '</p>'
          + '</article>';
  document.getElementById(displayElement).innerHTML = s;
}

// Question 1:(better) create an article using innerHTML
const makeArticleV2 = function(displayElement, position, name, lastName, email) {
  let s = `<article><h2>Position: ${position}</h2>
            <p>Name: ${name}</p>
            <p>Last Name: ${lastName}</p>
            <p>Email: ${email}</p>
          </article>`;
  console.log(s);
  document.getElementById(displayElement).innerHTML = s;
}

// If the lement with the given id is found we return its value otherwise we return a message.
function getValueByID(id) {
  let element = document.getElementById(id);
  if(element)
    return element.value; 
  else
    throw new Error("Element not found!");
}

// Clears the element that has the given id if any.
function clearElementByID(id){
  let element = document.getElementById(id);
  if(element)
    element.innerHTML = ""
  else
    throw new Error("Element to clear not found!");
}
