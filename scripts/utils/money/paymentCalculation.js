import { cart } from "../../../data/cart-class.js";
import { getProduct } from "../../../data/products.js";
import { delivery } from "../../../data/deliveryOptions.js";
import { calculate10PercentTax, formatCurrency } from "./moneyFormat.js";


class PaymentCalculation {
  totalProductsPriceCents = 0;
  totalShippingPriceCents = 0;
  totalBeforeTaxCents = 0;
  totalTaxCents = 0;
  finalTotalPriceCents = 0;

  init() { // This method will be automatically run by loadApp()

    // Reset values first to avoid stacking values
    this.totalProductsPriceCents = 0;
    this.totalShippingPriceCents = 0;

    cart.cartItem.forEach(cartItem => {
      const productId = cartItem.productId; // get cart item ID
      const matchingProduct = getProduct(productId); // get the same ID from the Products

      if (matchingProduct) { // if existed
        this.totalProductsPriceCents += matchingProduct.priceCents * cartItem.quantity; // multiply products price to its quantity
      }

      // Find matching delivery option
      const deliveryOption = delivery.getDeliveryOption(cartItem.deliveryOptionsId);
      this.totalShippingPriceCents += deliveryOption.shippingPriceCents;
    });

    this.setTotalBeforeTaxCents();
    this.setTotalTaxCents();
    this.setFinalTotalPriceCents();
  }

  // setters
  setTotalBeforeTaxCents() {
    // sum the total product price to shipping price
    this.totalBeforeTaxCents = this.totalProductsPriceCents + this.totalShippingPriceCents;
  }

  setTotalTaxCents() {
    // hold the 10% tax of the total price
    this.totalTaxCents = Number(calculate10PercentTax(this.totalBeforeTaxCents));
  }

  setFinalTotalPriceCents() {
    // sum the total price to 10% tax
    this.finalTotalPriceCents = this.totalBeforeTaxCents + this.totalTaxCents;
  }

  // getters
  getProductPrice() {
    return formatCurrency(this.totalProductsPriceCents);
  }

  getShippingPrice() {
    return formatCurrency(this.totalShippingPriceCents);
  }

  getTotalBeforeTax() {
    return formatCurrency(this.totalBeforeTaxCents);
  }

  getTotalTax() {
    return formatCurrency(this.totalTaxCents);
  }

  getFinalTotalPrice () {
    return formatCurrency(this.finalTotalPriceCents);
  }

  getRawFinalTotalPrice() {
    return this.finalTotalPriceCents;
  }
  
}

// Export as an instance
export const payment = new PaymentCalculation();