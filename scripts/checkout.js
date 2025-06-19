import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart-class.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js'; // for practice

async function loadCheckoutPage() {
  try {
    // Fetch style not XHR
    await loadProductsFetch();
    // XHR style not Fetch
    await new Promise((resolve) => {
      loadCart(() => resolve());
    });

    // now safe to render data
    renderPaymentSummary(); 
    renderOrderSummary();

  } catch (error) {
    console.error('Something went wrong loading checkout:', error);
    // You can show error message on UI here if needed
  }
}
loadCheckoutPage();

/* 
Promise.all([
  // already return promise
  loadProductsFetch(),

  // Promisify loadCart()
  new Promise((resolve) => {
    loadCart(() => {
      resolve(); // signal that loading is done
    });
  })
])
.then(() => {
  renderPaymentSummary(); // now safe to render data
  renderOrderSummary();   // now safe to render data
});
*/

// Step by Step 'Promise'
// also can use resolve parameter as bridge for value/data
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