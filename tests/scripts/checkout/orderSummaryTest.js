import { renderOrderSummary } from "../../../scripts/checkout/orderSummary.js";
import { cart } from '../../../data/cart-class.js';
import { products } from '../../../data/products.js';

describe('Test Suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() => {
  spyOn(localStorage, 'setItem');

  document.querySelector(".js-test-container").innerHTML = `
    <div class="js-ItemsCount"></div>
    <div class="js-orderSummary"></div>
    <div class="js-paymentSummary"></div>
  `;

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
    cart.initCart();
    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = '';
  });

  it('Display the cart', () => {

    expect(
      document.querySelectorAll('.js-cartItemContainerTEST').length
    ).toEqual(2);

  });

  it('Display right product name', () => {
    expect(
      products[0].name
    ).toEqual(
      'Black and Gray Athletic Cotton Socks - 6 Pairs'
    );
  });


  it('Display right product quantity', () => {

    expect(
      document.querySelector(`.jsTest-productQuantity-${productId1}`).innerText
    ).toContain('Quantity: 2');
    expect(
      document.querySelector(`.jsTest-productQuantity-${productId2}`).innerText
    ).toContain('Quantity: 1');
    
  });


  it('Removes a product', () => {

    expect(document.querySelectorAll('.js-cartItemContainerTEST').length).toBe(2);

    document.querySelector(`.jsTest-deleteLink-${productId1}`).click();
    
    expect(
      document.querySelectorAll('.js-cartItemContainerTEST').length
    ).toBe(1);

    expect(
      document.querySelector(`.js-CartItemContainer-${productId1}`)
    ).toBeNull();

    expect(
      document.querySelector(`.js-CartItemContainer-${productId2}`)
    ).not.toBeNull();
    expect(cart.cartItem.length).toEqual(1);
    expect(cart.cartItem[0].productId).toEqual(productId2);

  });
  

});