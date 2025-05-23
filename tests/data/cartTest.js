import { cart } from '../../data/cart-class.js';

describe('Test Suite: addToCart', () => {

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('adds an existing product to the cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    cart.initCart();

    cart.addToCart(productId1, 1);
    expect(cart.cartItem.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItem[0].productId).toEqual(productId1);
    expect(cart.cartItem[0].quantity).toEqual(2);
  });

  it('adds a new product to the cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    cart.initCart();

    cart.addToCart(productId1, 1);
    expect(cart.cartItem.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItem[0].productId).toEqual(productId1);
    expect(cart.cartItem[0].quantity).toEqual(1);
  });
  
});

describe('Test Suite: removeFromCart', () => {

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('Remove a product that is in the cart', () => {

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

    cart.removeFromCart(productId2);
    const productIds = cart.cartItem.map(item => item.productId);

    expect(productIds).not.toContain(productId2);
    expect(productIds).toContain(productId1);
    expect(cart.cartItem.length).toEqual(1);

  });

});