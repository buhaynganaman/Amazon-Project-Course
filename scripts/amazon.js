import { cart } from '../data/cart-class.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let productsHTML = ``; // store the HTML template

products.forEach((product) => { // generate the HTML Template for each product
	productsHTML += `
		<div class="product-container">
	<div class="product-image-container">
		<img class="product-image" src="${product.image}">
	</div>

	<div class="product-name limit-text-to-2-lines">
		${product.name}
	</div>

	<div class="product-rating-container">
		<img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
		<div class="product-rating-count link-primary">
			${product.rating.count}
		</div>
	</div>

	<div class="product-price">
		${formatCurrency(product.priceCents)}
	</div>

	<div class="product-quantity-container">
		<select class="js-QuantitySelector-${product.id}">
			<option selected value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
			<option value="7">7</option>
			<option value="8">8</option>
			<option value="9">9</option>
			<option value="10">10</option>
		</select>
	</div>

	<div class="product-spacer"></div>

	<div class="added-to-cart js-addedToCart-${product.id}">
		<img src="images/icons/checkmark.png">
		Added
	</div>

	<button class="add-to-cart-button button-primary js-addToCart"
		data-product-id="${product.id}">
		Add to Cart
	</button>
		</div>
	`;
});

const productGrid = document.querySelector(".js-productsGrid");
productGrid.innerHTML = productsHTML; // render the products to the page

// Initialize timeout IDs for setTimeout in an object to store each product timeout ID
const addedMessageTimeouts = {};
function addedMessage(productId) {
	const previousTimeoutId = addedMessageTimeouts[productId];
	if (previousTimeoutId) {
		clearTimeout(previousTimeoutId); // Restart timeout if it exists
	}

	const addedMessage = document.querySelector(`.js-addedToCart-${productId}`);
	addedMessage.style.opacity = 1; // Show added message

	const timeoutID = setTimeout(() => {
		addedMessage.style.opacity = 0;
	}, 2000);

	// Save the timeoutId for this product
	addedMessageTimeouts[productId] = timeoutID;
}

// Add to Cart Button DOM
document.querySelectorAll('.js-addToCart').forEach((button) => {
	button.addEventListener('click', () => {
		const { productId } = button.dataset; // Get the button data-attribute to identify which product is clicked

		const quantitySelector = document.querySelector(`.js-QuantitySelector-${productId}`);
		let quantity = Number(quantitySelector.value); // Get the selected quantity

		cart.addToCart(productId, quantity);
		addedMessage(productId);
		updateCartQuantity();

		console.log(cart.cartItem);
	});
});

function updateCartQuantity() { // Render the quantity in the cart page
	const renderCartQuantity = document.querySelector(".js-cartQuantity");
	renderCartQuantity.textContent = cart.calculateCartQuantity();

	if (cart.calculateCartQuantity() === 0) {
		renderCartQuantity.textContent = "";
	}
}
updateCartQuantity();
