document.addEventListener('DOMContentLoaded', ready);

var items = [];
var price = 0;

const getITemsInCart = () => {
    const items = [];
        const cartItemContainer = document.getElementById("cart-items");
        const cartRows = document.getElementsByClassName("cart-row");
        for(let i = 0; i < cartRows.length; i++){
            const row = cartRows[i];
            const quantityElement = row.getElementsByClassName("cart-quantity-input")[0];
            const quantity = quantityElement.value;
            var id = row.dataset.itemId;
            items.push({
                id: id,
                quantity: quantity
            })
        }
        return items;
}

const cleanCart = () => {
    var cartItems = document.getElementById('cart-items');
    while(cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

// Do payment
function purchaseClicked() {

    fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: items
        })
    }).then((result) => {
        if (result.ok) {
            console.log(result);
            return result.json();
        } 
        return result.json().then( json => Promise.reject(json));
    }).then(( {url} ) => {
        window.location = url;
    }).catch( err => {
        console.error(err);
    })
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-remove')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}


function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal();
    items = getITemsInCart();

    const priceElement = document.getElementById("cart-total-price");
    price = parseFloat(priceElement.innerText.replace('$', '')) * 100;
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    var id = shopItem.dataset.itemId;
    addItemToCart(title, price, imageSrc, id);
    updateCartTotal();

    items = getITemsInCart();

    const priceElement = document.getElementById("cart-total-price");
    price = parseFloat(priceElement.innerText.replace('$', '')) * 100;
}

function addItemToCart(title, price, imageSrc, id) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    cartRow.dataset.itemId = id;
    var cartItems = document.getElementById('cart-items');
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart');
            return;
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-remove" type="button">REMOVE</button>
        </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

function updateCartTotal() {
    var cartItemContainer = document.getElementById('cart-items');
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total += (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementById('cart-total-price').innerText = '$' + total;
}