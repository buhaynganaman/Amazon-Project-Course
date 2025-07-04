import { cart } from '../../data/cart-class.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money/moneyFormat.js';
import { delivery, getDeliveryDetails } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';
import { payment } from '../utils/money/paymentCalculation.js';

export function renderOrderSummary(cartInstance = cart) {

	let cartSummaryHTML = '';

	if(!cart.calculateCartQuantity()) {
		cartSummaryHTML = 
		`
			<p style="margin-bottom: 15px">Your cart is empty.</p>
			<button class="button-primary" style="padding: 10px 15px">
			<a href="amazon.html">View Products</a>
			</button>
		`
	} else {
		cartInstance.cartItem.forEach((cartItem) => {

			const productId = cartItem.productId;
			let matchingProduct = getProduct(productId); // Find matching product

			const deliveryDate = getDeliveryDetails(cartItem.deliveryOptionsId);
	
			cartSummaryHTML += `
				<div class="cart-item-container js-cartItemContainerTEST js-CartItemContainer-${matchingProduct.getID()}">
	
					<!-- Delivery Date -->
					<div class="delivery-date">Delivery date: ${deliveryDate}</div>
	
					<div class="cart-item-details-grid">
	
						<!-- Product Image -->
						<img class="product-image" src="${matchingProduct.getImageUrl()}">
	
						<div class="cart-item-details">
	
							<!-- Product Name -->
							<div class="product-name">${matchingProduct.getName()}</div>
	
							<!-- Product Price -->
							<div class="product-price">${matchingProduct.getPrice()}</div>
	
							<div class="product-quantity jsTest-productQuantity-${matchingProduct.getID()}">
								
								<!-- Quantity Label -->
								<span>Quantity: <span class="quantity-label js-quantityLabel-${matchingProduct.getID()}">${cartItem.quantity}</span></span>
								
								<!-- Update Button -->
								<span class="update-quantity-link 
								link-primary 
								js-updateQuantityLink" 
								data-product-id="${matchingProduct.getID()}">
								Update</span>
	
								<!-- Quantity Input -->
								<input type="number" class="quantity-input js-quantityInput-${matchingProduct.getID()}" data-product-id="${matchingProduct.getID()}">
								
								<!-- Save Button -->
								<span class="save-quantity-link 
								link-primary 
								js-saveLink" 
								data-product-id="${matchingProduct.getID()}">
								Save</span>
	
								<!-- Delete Button -->
								<span class="delete-quantity-link 
								link-primary 
								js-deleteLink 
								jsTest-deleteLink-${matchingProduct.getID()}" data-product-id="${matchingProduct.getID()}">
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
	}

	document.querySelector(".js-orderSummary").innerHTML = cartSummaryHTML; // Render cart items

	// Generate delivery options HTML
	function deliveryOptionsHTML(matchingProduct, cartItem) {
		return delivery.options.map(option => {
			const deliveryDateFormat = delivery.calculateDeliveryDate(option.deliveryDays)
			
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

		payment.init();
		renderCheckoutHeader();
		renderPaymentSummary();
	}

	// Deleting item (BTN)
	document.querySelectorAll(".js-deleteLink").forEach(link => {
		link.addEventListener('click', () => {
			const { productId } = link.dataset;

			cartInstance.removeFromCart(productId);

			document.querySelector(`.js-CartItemContainer-${productId}`).remove();
			
			payment.init();
			renderCheckoutHeader();
			renderOrderSummary();
			renderPaymentSummary();
		});
	});

	// Update delivery option
	document.querySelectorAll(".js-deliveryOption").forEach(option => {
		option.addEventListener('click', () => {
			const { productId, deliveryOptionId } = option.dataset;
			cartInstance.updateDeliveryOption(productId, deliveryOptionId);
			payment.init();
			renderOrderSummary();
			renderPaymentSummary();
		});
	});

	renderCheckoutHeader();
	// console.log("OrderSummary.js All Working"); // for checking
}