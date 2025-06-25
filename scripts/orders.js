import { updateCartQuantity } from './headers/renderHeaders.js';
import { renderYourOrders } from './orders/renderYourOrders.js';
import { loadApp } from './utils/loadApp/apploader.js';

updateCartQuantity();

loadApp([renderYourOrders]);