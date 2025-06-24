import { updateCartQuantity } from './headers/renderHeaders.js';
import { renderYourOrders } from './orders/renderYourOrders.js';
import { loadProductsFetch } from "../data/products.js";

updateCartQuantity();

async function loadOrderPage() {
  try {
    // Fetch style not XHR, its already a promise
    await loadProductsFetch();

    // now safe to render data
    renderYourOrders();

  } catch (error) {
    console.error('Something went wrong loading checkout:', error);
    // show error message
  }
}
loadOrderPage();