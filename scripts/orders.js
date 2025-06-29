import { payment } from './utils/money/paymentCalculation.js';
import { updateCartQuantity } from './headers/renderHeaders.js';
import { renderYourOrders } from './orders/renderYourOrders.js';
import { loadApp } from './utils/loadApp/apploader.js';

updateCartQuantity();

loadApp([() => payment.init(), renderYourOrders, /* () => {
  console.log(typeof payment)
  console.log('Class Total Product Price', payment.getProductPrice());
  console.log('Class Total Shipping Price', payment.getShippingPrice());
  console.log('Class Total Before Tax', payment.getTotalBeforeTax());
  console.log('Class Total Tax ', payment.getTotalTax());
  console.log('Class Final Price ', payment.getFinalTotalPrice());
  console.log('Class Raw Final Price ',payment.getRawFinalTotalPrice())
} */]);