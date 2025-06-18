// Import function that renders the cart items into the HTML (summary page)
import { renderOrderSummary } from "../../../scripts/checkout/orderSummary.js";
// Import the OOP-based cart system (test version)
import { testCart } from '../../../data/cart-class.js';
// Import the products list used for lookup (e.g. name, price, etc.)
import { products, loadProductsFetch } from '../../../data/products.js';


// Define the main test suite for order summary rendering
describe('Test Suite: renderOrderSummary', () => {
  // Define two product IDs for testing purposes
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  // This will run before All test
  // "done" is a built in method of jasmine, it waits the code to finish before running the next function, so if the loadProductsFetch done loading, 'done' will be called and finish the function and next.
  beforeAll((done) => {
    loadProductsFetch(() => {
      // dummy function just for testing 'renderHomePage();'
    }).then(() => {
      done();
    })
  })

  // This will run before every test
  beforeEach(() => {
    // Spy on localStorage.setItem para hindi ito mag-save talaga sa localStorage
    spyOn(localStorage, 'setItem');

    // Create the container elements that renderOrderSummary depends on
    document.querySelector(".js-test-container").innerHTML = `
      <div class="js-ItemsCount"></div>
      <div class="js-orderSummary"></div>
      <div class="js-paymentSummary"></div>
    `;

    // Simulate getting saved cart data from localStorage
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionsId: '1'
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionsId: '2'
        }
      ]);
    });

    // Initialize the cart with fake data (retrieved above)
    testCart.initCart();

    // Render the cart summary to the DOM
    renderOrderSummary(testCart);
  });

  // Cleanup: this resets the HTML container after each test
  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = '';
  });

  // Test if the cart correctly renders 2 items on screen
  it('Display the cart', () => {
    expect(
      document.querySelectorAll('.js-cartItemContainerTEST').length
    ).toEqual(2);
  });

  // Test if the correct product name from the products array is used
  it('Display right product name', () => {
    expect(
      products[0].name
    ).toEqual(
      'Black and Gray Athletic Cotton Socks - 6 Pairs'
    );
  });

  // Test if the correct product quantity is displayed for each product
  it('Display right product quantity', () => {
    expect(
      document.querySelector(`.jsTest-productQuantity-${productId1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.jsTest-productQuantity-${productId2}`).innerText
    ).toContain('Quantity: 1');
  });

  // Test if deleting a product updates the DOM and cart data correctly
  it('Removes a product', () => {
    // Initial check: make sure 2 products are rendered
    expect(document.querySelectorAll('.js-cartItemContainerTEST').length).toBe(2);

    // Simulate clicking the delete button for product 1
    document.querySelector(`.jsTest-deleteLink-${productId1}`).click();
    
    // After deletion: only 1 product container should remain
    expect(
      document.querySelectorAll('.js-cartItemContainerTEST').length
    ).toBe(1);

    // Product 1 container should now be removed from DOM
    expect(
      document.querySelector(`.js-CartItemContainer-${productId1}`)
    ).toBeNull();

    // Product 2 should still be present in the DOM
    expect(
      document.querySelector(`.js-CartItemContainer-${productId2}`)
    ).not.toBeNull();

    // Cart data should now have only 1 item
    expect(testCart.cartItem.length).toEqual(1);

    // Check if the remaining item is product 2
    expect(testCart.cartItem[0].productId).toEqual(productId2);
  });

});
