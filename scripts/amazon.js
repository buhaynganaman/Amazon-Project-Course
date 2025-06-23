import {  loadProductsFetch } from '../data/products.js';
import { renderProductsGrid } from './amazon/renderProductsGrid.js';

renderProductsGrid();

// trigger to render all data to page
loadProductsFetch(renderProductsGrid);