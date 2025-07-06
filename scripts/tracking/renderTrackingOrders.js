import { getProduct } from "../../data/products.js";
import { orders } from "../../data/ordersData.js";
import { convertToTimestamp } from "../utils/date & time/time.js";


const url = new URL(window.location.href);
// get url link IDs
let URLorderId = url.searchParams.get('orderId');
let URLproductId = url.searchParams.get('productId');

export function postOrders() {

  const orderMatch = orders.getOrders().find(order => order.getId() === URLorderId);
  if (!orderMatch) return;

  const productMatch = orderMatch.getProducts().find(product => product.getProductId() === URLproductId);
  if (!productMatch) return;

  const orderTime = convertToTimestamp(orderMatch.getDate());
  const deliveryTime = convertToTimestamp(productMatch.getDeliveryDate());
  const currentTime = Date.now();

  const progressPercent = (((currentTime - orderTime) / (deliveryTime - orderTime)) * 100).toFixed(2);

  console.log(`Order Time: ${orderTime}`);
  console.log(`Product Delivery Time: ${deliveryTime}`);
  console.log(`Current Time: ${currentTime}`);
  console.log(`Progress Percent: ${progressPercent}`);

  renderTrackingOrder(productMatch, progressPercent);
}


export function renderTrackingOrder(productItem, progressPercent) {
  const matchingProduct = getProduct(URLproductId);

  if (!matchingProduct) return;

  const trackingOrderHTML = `
    <div class="productDetails orderId-${URLorderId} productId-${URLproductId}">
      <div class="delivery-date">Arriving on ${productItem.getDeliveryDate()}</div>
      <div class="product-info">${matchingProduct.getName()}</div>
      <div class="product-info">Quantity: ${productItem.getQuantity()}</div>
      <img class="product-image" src="${matchingProduct.getImageUrl()}">

      <div class="progress-labels-container">
        ${progressStatus(progressPercent)}
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${progressPercent}%";></div>
      </div>
    </div>
  `;

  document.querySelector('.js-OrderTracking').innerHTML = trackingOrderHTML;

}

function progressStatus(progressPercent) {
  const preparingClass = progressPercent < 50 ? "current-status" : "";
  const shippedClass = progressPercent >= 50 && progressPercent < 100 ? "current-status" : "";
  const deliveredClass = progressPercent >= 100 ? "current-status" : "";

  return `
    <div class="progress-label ${preparingClass}">Preparing</div>
    <div class="progress-label ${shippedClass}">Shipped</div>
    <div class="progress-label ${deliveredClass}">Delivered</div>
  `;
}

