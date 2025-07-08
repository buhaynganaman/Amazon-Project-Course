import {  loadProductsFetch } from '../data/products.js';
import { renderProductsGrid } from './amazon/ProductsGrid.js';
import { products } from '../data/products.js';

renderProductsGrid();

// trigger to render all data to page
loadProductsFetch(renderProductsGrid)
.then(() => {

  

  const searchInput = 'tshirts';

  let searchKeywords = products.map(product => {
    return product.getKeywords();
  })
  console.log(searchKeywords)

  let result = searchKeywords.filter(keyword => keyword.includes(searchInput));
  console.log('Search Results:', result);

}).catch((error) => {
  console.error('Error loading products:', error);
});