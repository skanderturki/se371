document.addEventListener('DOMContentLoaded', ready);

const checkout = (price) => {
    fetch('https://secure.paytabs.sa/payment/request', {
        method: "POST",
        headers: {
            'authorization': paytabsServerKey,
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            profile_id:         98537,
            tran_type:          sale,
            tran_class:         ecom,
            cart_description:   "items",
            cart_id:            "4244b9fd-c7e9-4f16-8d3c-4fe7bf6c48ca",
            cart_currency:      "SAR",
            cart_amount:        price,
            callback:           "https://www.google.com",
            return:             "https://www.google.com",
        }),
       
    }).then((result) => {
        return result.json();
    }).then((data) => {
        console.log(data);
    }).catch((error)=>{
        console.log(error);
    })
}

const emptyCart = () => {
    var cartItems = document.getElementById('cart-items');
    while(cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

const afterCheckout = () => {
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
}
       



// Do payment
function purchaseClicked() {
    const priceElement = document.getElementById("cart-total-price");
    const price = parseFloat(priceElement.innerText.replace('$', '')) * 100;
    paytabs(price);
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
    updateCartTotal()
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