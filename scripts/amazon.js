import { renderProductsGrid } from './amazon/ProductsGrid.js';
import { loadApp } from './utils/loadApp/apploader.js';
import { products } from '../data/products.js';

loadApp([renderProductsGrid])