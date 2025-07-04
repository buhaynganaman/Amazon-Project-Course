import { delivery } from "../../../data/deliveryOptions.js";

export function overrideDeliveryDates(order, cartItems) {
  order.products.forEach(product => {
    const match = cartItems.find(item => item.productId === product.productId);
    if (match) {
      const deliveryOption = delivery.getDeliveryOption(match.deliveryOptionsId);
      product.estimatedDeliveryTime = delivery.calculateDeliveryDate(deliveryOption.deliveryDays);
    }
  });
}