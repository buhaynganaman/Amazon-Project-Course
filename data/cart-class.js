export class Cart {
      cartItem = [];
      #localStorageKey;

	constructor(localStorageKey) {
		this.#localStorageKey = localStorageKey;
            this.initCart(); // initialize automatically
	}

      // Export an init function to load (or reset) the cart
      initCart() {
            const data = JSON.parse(localStorage.getItem(this.#localStorageKey));
                  if (Array.isArray(data)) { // check if the data is an array
                        this.cartItem = data; // if true store it in 'cart'
                  } else {
                        // if false, this will be your default cart fallback
                        this.cartItem = [
                              { 
                                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
                                    quantity: 2, 
                                    deliveryOptionsId: '1' 
                              },
                              { 
                                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', 
                                    quantity: 1, 
                                    deliveryOptionsId: '2' 
                              }
                        ];
                  }
            }
      
            // Save cart to localStorage
            saveToStorage() {
                  localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItem));
            }

            addToCart(productId, quantity) {
                  // find if the product is already exist in the cart
                  let matchingItem = this.cartItem.find(item => item.productId === productId);
            
                  // if TRUE
                  if (matchingItem) {
                        matchingItem.quantity += quantity; // only increase the quantity
                  } else { 
                        this.cartItem.push({
                              productId,
                              quantity,
                              deliveryOptionsId: '1'
                        }); // else Add new product if not exist in the cart
                  }
            
                  this.saveToStorage();
            }
      
            // Over ALl function: the productId that pass to this function parameter would be eliminated from cart and the cartItems that not pass from the parameter will remain to the main Cart.
            removeFromCart(productId) {
                  this.cartItem = this.cartItem.filter(cartItem => cartItem.productId !== productId); // Remove item from cart
                  this.saveToStorage();
            }
      
            calculateCartQuantity() { // Get total item count
                  let productQuantity = 0; 
            
                  this.cartItem.forEach((cartItem) => {
                        productQuantity += cartItem.quantity;
                  });
            
                  return productQuantity;
            }
      
            // modify the quantity of selected Product.
            updateQuantity(productId, newQuantity) {
                  this.cartItem.forEach((cartItem) => {
                        if (productId === cartItem.productId)
                              cartItem.quantity = newQuantity;
                  });
      
                  this.saveToStorage();
            }
      
            // Update delivery option
            updateDeliveryOption(productId, deliveryOptionId) {
                  this.cartItem.forEach((cartItem) => {
                        if (productId === cartItem.productId) {
                              cartItem.deliveryOptionsId = deliveryOptionId;
                        }
                  });
      
                  this.saveToStorage();
            }
}
// creating new different Cart Classes
// the parameter of Cart() is a uniq ID for each Cart Classes to defined a uniq self cart objects
export const cart = new Cart('cart-oop');

// const businessCart = new Cart('cart-business');

// for checking
console.log(cart.calculateCartQuantity() +  " Quantity Working Realtime");
console.log(cart.cartItem.length +  " Cart Length Working Realtime");

console.log(cart);
// console.log(businessCart);

// console.log(businessCart instanceof Cart);