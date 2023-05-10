class Homepage extends Page {
  constructor() {
    this.#myHTML = {
      header: '<img src=image.jpg /><h1>Homepage</h1>',
      main: '<section>' +
            '<article>' +
            '<form method="post" action="/search">' +
            '<label for="search">Search</label>' +
            '<input id="search" name="search"></input>' +
            '</form>' +
            '</article>' +
            '</section>',
      footer: '<ul>' +
              '<li><a href="about.html">About</a></li>' +
              '<li><a href="contactus.html">Contact Us</a></li>' +
              '</ul>',
    }
  }

}




// Returns an HTML div element that can be appended as the only child of the current header
// in the page.
const getHeader = (headerHTMLElement, title, imageURL) => {
  const div = document.createElement("div");

  const h1 = document.createElement("h1");
  h1.appendChild(document.createTextNode(title));

  const img = document.createElement("img");
  img.src = imageURL;

  div.appendChild(h1);
  div.appendChild(img);
  
  // Remove all existing children of receiving element.
  while (headerHTMLElement.firstChild) {
    headerHTMLElement.removeChild(headerHTMLElement.lastChild);
  }
  headerHTMLElement.appendChild(div);
}

const getMain = () => {

}

const getFooter = () => {

}