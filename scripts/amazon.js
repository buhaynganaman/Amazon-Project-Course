import {  loadProductsFetch } from '../data/products.js';
import { renderProductsGrid } from './amazon/ProductsGrid.js';

renderProductsGrid();

// trigger to render all data to page
loadProductsFetch(renderProductsGrid);