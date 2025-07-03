import { getProduct } from "../../data/products.js";
import { orders } from "../../data/ordersData.js";


const url = new URL(window.location.href);
// get url link IDs
let URLorderId = url.searchParams.get('orderId');
let URLproductId = url.searchParams.get('productId');

export function postOrders() {

  const orderMatch = orders.getOrders().find(order => order.getId() === URLorderId);
  if (!orderMatch) return;

  const productMatch = orderMatch.getProducts().find(product => product.getProductId() === URLproductId);
  if (!productMatch) return;

  renderTrackingOrder(productMatch);
}


export function renderTrackingOrder(productItem) {
  const matchingProduct = getProduct(URLproductId);

  if (!matchingProduct) return;

  const trackingOrderHTML = `
    <div class="productDetails orderId-${URLorderId} productId-${URLproductId}">
      <div class="delivery-date">Arriving on ${productItem.getDeliveryDate()}</div>
      <div class="product-info">${matchingProduct.getName()}</div>
      <div class="product-info">Quantity: ${productItem.getQuantity()}</div>
      <img class="product-image" src="${matchingProduct.getImageUrl()}">
      <div class="progress-labels-container">
        <div class="progress-label">Preparing</div>
        <div class="progress-label current-status">Shipped</div>
        <div class="progress-label">Delivered</div>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>
    </div>
  `;

  document.querySelector('.js-OrderTracking').innerHTML = trackingOrderHTML;
  console.log('Rendered');
}
