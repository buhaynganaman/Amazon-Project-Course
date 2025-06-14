// Importing the testCart instance from the cart-class module
import { testCart } from '../../data/cart-class.js';

// Test suite for the "addToCart" method
describe('Test Suite: addToCart', () => {

  // Sample product IDs for testing
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  // Runs before each individual test
  beforeEach(() => {
    // Spy on localStorage.setItem to monitor if it's called (without actually saving data)
    spyOn(localStorage, 'setItem');
  });

  // Test if cart updates quantity of existing product
  it('adds an existing product to the cart', () => {

    // Simulate localStorage data that already has productId1 with quantity 1
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    // Initialize the cart with the fake data
    testCart.initCart();

    // Add the same product again with quantity 1
    testCart.addToCart(productId1, 1);

    // Assert that the cart still has 1 item (because it's same product, updated quantity only)
    expect(testCart.cartItem.length).toEqual(1);
    // Check that localStorage.setItem was called once
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // Validate that the product ID is still productId1
    expect(testCart.cartItem[0].productId).toEqual(productId1);
    // Check if quantity updated from 1 to 2
    expect(testCart.cartItem[0].quantity).toEqual(2);
  });

  // Test if cart adds a new product properly when cart is empty
  it('adds a new product to the cart', () => {

    // Simulate empty localStorage (no items in cart)
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    // Initialize the cart with the fake empty data
    testCart.initCart();

    // Add productId1 to the empty cart
    testCart.addToCart(productId1, 1);

    // Assert that the cart now contains 1 item
    expect(testCart.cartItem.length).toEqual(1);
    // Make sure localStorage.setItem was called
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // Confirm correct product was added
    expect(testCart.cartItem[0].productId).toEqual(productId1);
    // Quantity should be 1
    expect(testCart.cartItem[0].quantity).toEqual(1);
  });

});


// Test suite for the "removeFromCart" method
describe('Test Suite: removeFromCart', () => {

  // Re-using same product IDs from earlier
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  // Run before each test to reset spies
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  // Test if a product is correctly removed from cart
  it('Remove a product that is in the cart', () => {

    // Fake localStorage data with two products in cart
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });

    // Initialize cart with fake data
    testCart.initCart();

    // Remove productId2 from the cart
    testCart.removeFromCart(productId2);

    // Extract all product IDs still in the cart
    const productIds = testCart.cartItem.map(item => item.productId);

    // Check that productId2 was successfully removed
    expect(productIds).not.toContain(productId2);
    // Check that productId1 is still in the cart
    expect(productIds).toContain(productId1);
    // Cart should now contain only 1 item
    expect(testCart.cartItem.length).toEqual(1);
  });

});
