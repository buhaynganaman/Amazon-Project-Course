import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js'; // for practice
loadProducts(() => {
  renderPaymentSummary();
  renderOrderSummary();
})
// console.log("Checkout.js All Working") // for checking