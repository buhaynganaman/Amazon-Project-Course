import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart-class.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js'; // for practice

Promise.all([
  // Promisify loadProducts()
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('kupal'); // signal that loading is done
    });
  }),

  // Promisify loadCart()
  new Promise((resolve) => {
    loadCart(() => {
      resolve('yawa'); // signal that loading is done
    });
  })
])
.then((value) => {
  console.log(value); // ['kupal', 'yawa']
  renderPaymentSummary(); // now safe to render data
  renderOrderSummary();   // now safe to render data
});


/* new Promise((resolve) => {
  loadProducts(() => {
    resolve('kupal');
  })

}).then((value) => {
  console.log(value)
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderPaymentSummary();
  renderOrderSummary();
}) */

/* 
// callback loading (example)
loadProducts(() => {
  loadCart(() => {
    renderPaymentSummary();
    renderOrderSummary();
  });
})
*/


// console.log("Checkout.js All Working") // for checking