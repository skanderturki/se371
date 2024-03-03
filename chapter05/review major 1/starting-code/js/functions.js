/* define your functions here */

const calculateTotal = (price, quantity) => price * quantity;
//console.log( calculateTotal(4.5, 6) );

const outputCartRow = ( item, total ) => {
  document.write(`<tr>
      <td><img src="./images/${item.product.filename}"></td>
      <td>${item.product.title}</td>
      <td>${item.quantity}</td>
      <td>$${item.product.price}</td>
      <td>$${total.toFixed(2)}</td>
    </tr>`
  );
}

const outputTotal = ( total ) => {
  document.write(`<tr class="totals">
      <td colspan="4">Subtotal</td>
      <td>$${total}</td>
    </tr>`
  );
}

const outputTaxTotal = ( total, tax_rate ) => {
  document.write(`<tr class="totals">
      <td colspan="4">Tax</td>
      <td>$${total * tax_rate}</td>
    </tr>`
  );
}

const outputShipping = ( total, shipping_threshold ) => {
  let shipping = 0;
  if(total > shipping_threshold) shipping = 0;
  else shipping = 40;
  document.write(`<tr class="totals">
      <td colspan="4">Shipping</td>
      <td>$${shipping}</td>
    </tr>`
  );
}

const outputGrandTotal = ( total, tax_rate, shipping_threshold ) => {

  let shipping = 0;
  if(total > shipping_threshold) shipping = 0;
  else shipping = 40;
  let grand_total = shipping + total * (1 + tax_rate*1);
  document.write(`<tr class="totals">
     <td colspan="4" class="focus">Grand Total</td>
     <td class="focus">$${grand_total.toFixed(2)}</td>
    </tr>`
  );
}




        
