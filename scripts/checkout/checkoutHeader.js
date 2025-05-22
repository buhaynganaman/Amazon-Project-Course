import { cart, calculateCartQuantity } from '../../data/cart.js';

// Update cart summary
export function renderCheckoutHeader() {
      const cartQuantity = calculateCartQuantity();
      document.querySelector('.js-ItemsCount').innerHTML = `${cart.length} Products, ${cartQuantity} items`;
}