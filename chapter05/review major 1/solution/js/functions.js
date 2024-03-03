/* define your functions here */

function outputCartRow(item, total) {
    document.write('<tr>');
    document.write('<td class="painting"><img src="images/' + item.product.filename + '"></td>');
    document.write('<td>' + item.product.title + '</td>');
    document.write('<td class="center">' + item.quantity + '</td>');
    document.write('<td class="right">$' + item.product.price.toFixed(2) + '</td>');
    document.write('<td class="right">$' + total.toFixed(2) + '</td>');
    document.write('</tr>');            
}


function calculateTotal(quantity, price) {
    return quantity * price;
}

function calculateTax(subtotal, rate) {
    return subtotal * rate;
}

function calculateShipping(subtotal, threshold) {
    if (subtotal > threshold) {
        return 0;
    }
    else {
        return 40;
    }
}

function calculateGrandTotal(subtotal,tax,shipping) {
    return subtotal + tax + shipping;   
}

function outputCurrency(num) {
    document.write("$" + num.toFixed(2));   
}
        
