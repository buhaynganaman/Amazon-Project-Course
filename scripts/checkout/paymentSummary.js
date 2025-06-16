import { cart } from "../../data/cart-class.js";
import { getProduct } from '../../data/products.js';
import { formatCurrency, calculate10PercentTax } from '../utils/money.js';
import { delivery } from '../../data/deliveryOptions.js';

export function renderPaymentSummary() {

const cartQuantity = cart.calculateCartQuantity(); // get the Over All quantity
let totalProductsPriceCents = 0;
let totalShippingPriceCents = 0;

cart.cartItem.forEach(cartItem => {
	const productId = cartItem.productId;
	const matchingProduct = getProduct(productId); // Find matching product

	if (matchingProduct) { // Make sure the product exists
	totalProductsPriceCents += matchingProduct.priceCents * cartItem.quantity; // multiply products price to its quantity
}

	const deliveryOption = delivery.getDeliveryOption(cartItem.deliveryOptionsId); // Find matching delivery option
	totalShippingPriceCents += deliveryOption.shippingPriceCents; // store shipping price
});
	// sum the total product price to shipping price
const totalBeforeTaxCents = Number(totalProductsPriceCents + totalShippingPriceCents);
	// hold the 10% tax of the total price
const totalTaxCents = Number(calculate10PercentTax(totalBeforeTaxCents));
	// sum the total price to 10% tax
const finalTotalPriceCents = totalBeforeTaxCents + totalTaxCents;

const paymentSummaryHTML = 
`     
	<div class="payment-summary-title">
		Order Summary
	</div>

	<div class="payment-summary-row">
		<div>Items (${cartQuantity}):</div>
		<div class="payment-summary-money">$${formatCurrency(totalProductsPriceCents)}</div>
	</div>

	<div class="payment-summary-row">
		<div>Shipping &amp; handling:</div>
		<div class="payment-summary-money">$${formatCurrency(totalShippingPriceCents)}</div>
	</div>

	<div class="payment-summary-row subtotal-row">
		<div>Total before tax:</div>
		<div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
	</div>

	<div class="payment-summary-row">
		<div>Estimated tax (10%):</div>
		<div class="payment-summary-money">$${formatCurrency(totalTaxCents)}</div>
	</div>

	<div class="payment-summary-row total-row">
		<div>Order total:</div>
		<div class="payment-summary-money">$${formatCurrency(finalTotalPriceCents)}</div>
	</div>

	<button class="place-order-button button-primary">
		Place your order
	</button>
`
document.querySelector('.js-paymentSummary').innerHTML = paymentSummaryHTML;
// console.log("paymentSummary.js All Working"); // for checking
}