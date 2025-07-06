import { delivery } from "../../../data/deliveryOptions.js";


export function overrideDeliveryDates(order, cartItems) {
  
  // OBJECT destructuring to get products from the order.
  order.products.forEach(product => {

    // Find the matching cart item based on productId
    const match = cartItems.find(item => item.productId === product.productId);

    // If a match is found, calculate the estimated delivery time
    if (match) {
      // Get delivery option and calculate delivery date
      const deliveryOption = delivery.getDeliveryOption(match.deliveryOptionsId);
      
      if (!deliveryOption) return; // Skip if no delivery option found

      // Update the product's estimated delivery time property value
      product.estimatedDeliveryTime = delivery.calculateDeliveryDate(deliveryOption.deliveryDays); // Ex. "Monday, January 1"
    }

  });

}