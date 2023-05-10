
const tax_rate = prompt('Enter tax rate (0.10)');
const shipping_threshold = prompt('Enter shipping threshold (1000)');

var shipping;
var tax;

/* add loop and other code here ...*/
let subtotal = 0;

for(let item of cart){
  let total = calculateTotal(item.product.price, item.quantity);
  subtotal += total;
  outputCartRow(item, total);
}

outputSubtotalRow(subtotal);
outputTaxRow(subtotal, tax_rate);
outputShippingRow(subtotal, shipping_threshold);
outputGrandTotalRow(subtotal, shipping, tax);