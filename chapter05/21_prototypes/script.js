function Card(title, src, content) {
	this.title = title;
	this.src = src;
	this.content = content;
}

Card.prototype.makeMarkup = function() {
	return `<div class="card"> 
			<img src="${this.src}" alt="${this.title}" >
			<div>
				<h4>${this.title}</h4>
				<p>${this.content}</p>
			</div>
			</div>`;
};

Card.prototype.makeElement = function(where) {
	let root = document.getElementById(where);
	let cardDiv = document.createElement('div');
	//create image
	let cardImg = document.createElement('img');
	cardImg.src = this.src;
	cardImg.title = this.title;
	//create inner div
	let cardInnerDiv = document.createElement('div');
	let heading4 = document.createElement('h4');
	heading4.textContent = this.title;
	let paragraph = document.createElement('p');
	paragraph.textContent = this.content;
	cardInnerDiv.appendChild(heading4);
	cardInnerDiv.appendChild(paragraph);
	// append all to div
	cardDiv.appendChild(cardImg).appendChild(cardInnerDiv);
	// append all to root
	root.appendChild(cardDiv);
};

// You use prototype functions as if they were declared in the object
const c1 = new Card("Clean Javascript", 
										"./img/books/clean-javascript.jpg", 
										"Self Portrait"
									);
c1.makeElement("section_cards");
