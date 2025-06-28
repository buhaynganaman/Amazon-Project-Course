import { cart } from "../../data/cart-class.js";
import { getProduct } from '../../data/products.js';

import { delivery } from '../../data/deliveryOptions.js';
import { placeOrder } from "../../data/ordersData.js";
import { payment } from "../utils/money/paymentCalculation.js";

export function renderPaymentSummary() {

	const cartQuantity = cart.calculateCartQuantity(); // get the Over All quantity

	const paymentSummaryHTML = 
	`     
		<div class="payment-summary-title">
			Order Summary
		</div>

		<div class="payment-summary-row">
			<div>Items (${cartQuantity}):</div>
			<div class="payment-summary-money">$${payment.getProductPrice()}</div>
		</div>

		<div class="payment-summary-row">
			<div>Shipping &amp; handling:</div>
			<div class="payment-summary-money">$${payment.getShippingPrice()}</div>
		</div>

		<div class="payment-summary-row subtotal-row">
			<div>Total before tax:</div>
			<div class="payment-summary-money">$${payment.getTotalBeforeTax()}</div>
		</div>

		<div class="payment-summary-row">
			<div>Estimated tax (10%):</div>
			<div class="payment-summary-money">$${payment.getTotalTax()}</div>
		</div>

		<div class="payment-summary-row total-row">
			<div>Order total:</div>
			<div class="payment-summary-money">$${payment.getFinalTotalPrice()}</div>
		</div>

		<button class="place-order-button button-primary js-PlaceOrderBtn">
			Place your order
		</button>
	`
	document.querySelector('.js-paymentSummary').innerHTML = paymentSummaryHTML;

	const placeOrderBtn = document.querySelector('.js-PlaceOrderBtn');
	placeOrderBtn.addEventListener('click', () => {
		placeOrder();
	});

// console.log(cart.getItems())
// console.log("paymentSummary.js All Working"); // for checking
}
