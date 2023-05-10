// Question2:
const makeArticle2 = (idOfTarget, position, name, lastName, email) => {
  let s = '<article><h2>Position: ' + position + '</h2>'
          + '<p>Name: ' + name + '</p>'
          + '<p>Last Name: ' + lastName + '</p>'
          + '<p>Email: ' + email + '</p>'
          + '</article>';
  document.getElementById(idOfTarget).innerHTML = s;
}

// Question3
function employee(position, name, lastName, email) {
  this.position = position;
  this.name = name;
  this.lastName = lastName;
  this.email = email;
  this.makeHTMLIntoElementbyID = function(id) {
    let s = '<article><h2>Position: ' + this.position + '</h2>'
            + '<p>Name: ' + this.name + '</p>'
            + '<p>Last Name: ' + this.lastName + '</p>'
            + '<p>Email: ' + this.email + '</p>'
            + '</article>';
    document.getElementById(id).innerHTML = s;
  }
}

const objMakeArticle = (displayElement, position, name, lastName, email) => {
  let emp = new employee(position, name, lastName, email);
  emp.makeHTMLIntoElementbyID(displayElement);
}