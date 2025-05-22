export let cart;

initCart();

// Export an init function to load (or reset) the cart
export function initCart() {
	const data = JSON.parse(localStorage.getItem('cart'));
	if (Array.isArray(data)) { // check if the data is an array
		cart = data; // if true store it in 'cart'
	} else {
		// if false, this will be your default cart fallback
		cart = [
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


export function addToCart(productId, quantity) {
	// find if the product is already exist in the cart
	let matchingItem = cart.find(item => item.productId === productId);

	// if TRUE
	if (matchingItem) {
		matchingItem.quantity += quantity; // only increase the quantity
	} else { 
		cart.push({
			productId,
			quantity,
			deliveryOptionsId: '1'
		}); // else Add new product if not exist in the cart
	}

	saveToStorage();
}

// Save cart to localStorage
function saveToStorage() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

// Over ALl function: the productId that pass to this function parameter would be eliminated from cart and the cartItems that not pass from the parameter will remain to the main Cart.
export function removeFromCart(productId) {
	cart = cart.filter(cartItem => cartItem.productId !== productId); // Remove item from cart
	saveToStorage();
}

export function calculateCartQuantity() { // Get total item count
	let productQuantity = 0; 

	cart.forEach((cartItem) => {
		productQuantity += cartItem.quantity;
	});

	return productQuantity;
}

// modify the quantity of selected Product.
export function updateQuantity(productId, newQuantity) {
	cart.forEach((cartItem) => {
		if (productId === cartItem.productId)
			cartItem.quantity = newQuantity;
	});

	saveToStorage();
}

// Update delivery option
export function updateDeliveryOption(productId, deliveryOptionId) {
	cart.forEach((cartItem) => {
		if (productId === cartItem.productId) {
			cartItem.deliveryOptionsId = deliveryOptionId;
		}
	});

	saveToStorage();
}

console.log(calculateCartQuantity() +  " Quantity Working Realtime");
console.log(cart.length +  " Cart Length Working Realtime");