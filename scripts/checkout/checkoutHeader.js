import { cart } from '../../data/cart-class.js';

// Update cart summary
export function renderCheckoutHeader() {
      const cartQuantity = cart.calculateCartQuantity();
      document.querySelector('.js-ItemsCount').innerHTML = `${cart.cartItem.length} Products, ${cartQuantity} items`;
}