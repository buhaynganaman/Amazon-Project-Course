import { updateCartQuantity } from './headers/renderHeaders.js';
import {  postOrders, renderTrackingOrder } from './tracking/renderTrackingOrders.js';
import { loadApp } from './utils/loadApp/apploader.js';

updateCartQuantity();

loadApp([postOrders]);