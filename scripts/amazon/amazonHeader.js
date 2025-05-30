import { cart } from '../../data/cart-class.js';

export function updateCartQuantity() { // Render the quantity in the cart page
	const renderCartQuantity = document.querySelector(".js-cartQuantity");
  renderCartQuantity.textContent = cart.calculateCartQuantity();
  if (cart.calculateCartQuantity() === 0) {
		renderCartQuantity.textContent = "0";
	}
}