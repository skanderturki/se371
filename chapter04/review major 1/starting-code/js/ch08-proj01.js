
const tax_rate = prompt('Enter tax rate (example: 0.10)');
const shipping_threshold = prompt('Enter shipping threshold (1000)');

/* add loop and other code here ...*/
let cart_total = 0;

for(item of cart){

   let item_total = calculateTotal( item.product.price, item.quantity );
   cart_total+= item_total;
   outputCartRow(item, item_total);
}

outputTotal(cart_total);

outputTaxTotal(cart_total, tax_rate);

outputShipping(cart_total, shipping_threshold);

outputGrandTotal(cart_total, tax_rate, shipping_threshold);