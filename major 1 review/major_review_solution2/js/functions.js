/* define your functions here */

const calculateTotal = ( quantity, price ) => quantity * price;

const outputCartRow = ( item, total ) => {
  document.write(
    `<tr>
      <td><img src="images/${item.product.filename}"></td>
      <td>${item.product.title}</td>
      <td>${item.quantity}</td>
      <td>$${item.product.price.toFixed(2)}</td>
      <td>$${total.toFixed(2)}</td>
    </tr>`
  )
};

const outputSubtotalRow = ( subtotal ) => {
  document.write(
    `<tr class="totals">
      <td colspan="4">Subtotal</td>
      <td>$${subtotal}</td>
    </tr>`
  )
};

const outputTaxRow = ( total, tax_rate ) => {
  tax = total * tax_rate;
  document.write(
    `<tr class="totals">
      <td colspan="4">Tax</td>
      <td>$${tax}</td>
    </tr>`
  )
};

const outputShippingRow = ( subtotal, shipping_threshold ) => {
  shipping = 40;
  if(subtotal > shipping_threshold) shipping = 0;
  document.write(
    `<tr class="totals">
      <td colspan="4">Shipping</td>
      <td>$${shipping}</td>
    </tr>`
  )
};

const outputGrandTotalRow = ( subtotal ) => {
  let grand_total = subtotal + tax + shipping;
  document.write(
    `<tr class="totals">
      <td colspan="4" class="focus">Grand Total</td>
      <td class="focus">$${grand_total}</td>
    </tr>`
  )
};


        
