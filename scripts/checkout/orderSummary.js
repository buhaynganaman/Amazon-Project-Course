import { cart } from '../../data/cart-class.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from '../../data/deliveryOptions.js'; // Delivery options data
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderOrderSummary(cartInstance = cart) {
	let cartSummaryHTML = '';

	cartInstance.cartItem.forEach((cartItem) => {
		const productId = cartItem.productId;
		let matchingProduct = getProduct(productId); // Find matching product

		const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId); // Find matching delivery option
		const deliveryDateFormat = calculateDeliveryDate(deliveryOption.deliveryDays)

		cartSummaryHTML += `
			<div class="cart-item-container js-cartItemContainerTEST js-CartItemContainer-${matchingProduct.id}">

				<!-- Delivery Date -->
				<div class="delivery-date">Delivery date: ${deliveryDateFormat}</div>

				<div class="cart-item-details-grid">

					<!-- Product Image -->
					<img class="product-image" src="${matchingProduct.image}">

					<div class="cart-item-details">

						<!-- Product Name -->
						<div class="product-name">${matchingProduct.name}</div>

						<!-- Product Price -->
						<div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>

						<div class="product-quantity jsTest-productQuantity-${matchingProduct.id}">
							
							<!-- Quantity Label -->
							<span>Quantity: <span class="quantity-label js-quantityLabel-${matchingProduct.id}">${cartItem.quantity}</span></span>
							
							<!-- Update Button -->
							<span class="update-quantity-link 
							link-primary 
							js-updateQuantityLink" 
							data-product-id="${matchingProduct.id}">
							Update</span>

							<!-- Quantity Input -->
							<input type="number" class="quantity-input js-quantityInput-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
							
							<!-- Save Button -->
							<span class="save-quantity-link 
							link-primary 
							js-saveLink" 
							data-product-id="${matchingProduct.id}">
							Save</span>

							<!-- Delete Button -->
							<span class="delete-quantity-link 
							link-primary 
							js-deleteLink 
							jsTest-deleteLink-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
							Delete</span>
						</div>

					</div>

					<div class="delivery-options">
						<div class="delivery-options-title">Choose a delivery option:</div>
						${deliveryOptionsHTML(matchingProduct, cartItem)}
					</div>
				</div>
			</div>
		`;
	});

	document.querySelector(".js-orderSummary").innerHTML = cartSummaryHTML; // Render cart items

	// Generate delivery options HTML
	function deliveryOptionsHTML(matchingProduct, cartItem) {
		return deliveryOptions.map(option => {
			const deliveryDateFormat = calculateDeliveryDate(option.deliveryDays)
			
			const deliveryPriceFormat = option.shippingPriceCents === 0 ? "FREE" : `$${formatCurrency(option.shippingPriceCents)} -`;
			const isChecked = option.id === cartItem.deliveryOptionsId; // Mark checked the selected Item

			return `
				<div class="delivery-option js-deliveryOption" data-product-id="${matchingProduct.id}" data-delivery-option-id="${option.id}">
					<input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
					<div>
						<div class="delivery-option-date">${deliveryDateFormat}</div>
						<div class="delivery-option-price">${deliveryPriceFormat} Shipping</div>
					</div>
				</div>
			`;
		}).join('');
	}

	// Update quantity (BTN)
	document.querySelectorAll(".js-updateQuantityLink").forEach(link => {
		link.addEventListener('click', () => {
			const { productId } = link.dataset;
			document.querySelector(`.js-CartItemContainer-${productId}`).classList.toggle("is-editing-quantity"); // this class handle the input element and save btn element.
		});
	});

	// Save quantity button
	document.querySelectorAll(".js-saveLink").forEach(link => {
		link.addEventListener("click", () => updateProductQuantity(link));
	});

	// Update product quantity
	function updateProductQuantity(link) {
		const { productId } = link.dataset;
		const quantityInput = document.querySelector(`.js-quantityInput-${productId}`);
		let newQuantity = Number(quantityInput.value);

		// preventing to wrong input
		if (newQuantity <= 0) {
			newQuantity = 1;
		}
		
		cartInstance.updateQuantity(productId, newQuantity);
		document.querySelector(`.js-quantityLabel-${productId}`).textContent = newQuantity;
		document.querySelector(`.js-CartItemContainer-${productId}`).classList.remove("is-editing-quantity");

		renderCheckoutHeader();
		renderPaymentSummary();
	}

	// Deleting item (BTN)
	document.querySelectorAll(".js-deleteLink").forEach(link => {
		link.addEventListener('click', () => {
			const { productId } = link.dataset;

			cartInstance.removeFromCart(productId);

			document.querySelector(`.js-CartItemContainer-${productId}`).remove();
			
			renderCheckoutHeader();
			renderPaymentSummary();
		});
	});

	// Update delivery option
	document.querySelectorAll(".js-deliveryOption").forEach(option => {
		option.addEventListener('click', () => {
			const { productId, deliveryOptionId } = option.dataset;
			cartInstance.updateDeliveryOption(productId, deliveryOptionId);

			renderOrderSummary();
			renderPaymentSummary();
		});
	});

	renderCheckoutHeader();
	console.log("OrderSummary.js All Working");
}