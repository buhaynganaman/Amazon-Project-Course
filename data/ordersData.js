import { cart } from "./cart-class.js";

class Order {
  ordersData = [];           // Always an array
  orderIDs = [];             // Will hold ids
  orderTime = [];            // Will hold order times
  orderTotalCostCents = [];  // Will hold total cost cents
  orderProducts = [];        // Will hold products data

  constructor() {
    // Load data from storage
    this.ordersData = JSON.parse(localStorage.getItem('ordersData')) || [];
    this.setIDs();
    this.setTimes();
    this.setTotalCosts();
    this.setProducts();
  }

  async placeOrder() {
    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart: cart.getItems() }),
      });

      if (!response.ok) {
        throw new Error(`POST request failed: ${response.status}`);
      }

      const order = await response.json();
      this.addOrder(order);
    } catch (error) {
      console.log('ERROR "POST-REQUEST" at place order', error);
    }
  }

  addOrder(order) {
    this.ordersData.unshift(order);
    this.saveToStorage();
    this.setIDs();
    this.setTimes();
    this.setTotalCosts();
    this.setProducts();
  }

  saveToStorage() {
    localStorage.setItem('ordersData', JSON.stringify(this.ordersData));
  }

  // Setters
  setIDs() {
    this.orderIDs = this.ordersData.map(data => data.id);
  }

  setTimes() {
    this.orderTime = this.ordersData.map(data => data.orderTime);
  }

  setTotalCosts() {
    this.orderTotalCostCents = this.ordersData.map(data => data.totalCostCents);
  }

  setProducts() {
    this.orderProducts = this.ordersData.map(data => data.products);
  }

  // Getters
  getIDs() {
    return this.orderIDs;
  }

  getTimes() {
    return this.orderTime;
  }

  getTotalCosts() {
    return this.orderTotalCostCents;
  }

  getProducts() {
    return this.orderProducts;
  }

  // Debugging
  showOrdersData() {
    return this.ordersData;
  }
}

// Export instance
export const orders = new Order();


/* export async function placeOrder() {

  try {
    // send the cart products to Orders backend
    const response = await fetch('https://supersimplebackend.dev/orders', {
      method: 'POST',
      headers: {
        // Telling the server I am sending JSON
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        cart: cart.getItems()
      }),
    });

    // Check if the response is okay
    if (!response.ok) {
      throw new Error(`POST request failed: ${response.status}`);
    }
    
    // JSONparsed the response
    const order = await response.json();
    addOrder(order);
    
    console.log('Place Order Success')
    console.log(typeof order); // object
    console.log('ORDER', order); // order response
    console.log('ORDER ID', order.id); // order ID
    console.log('ORDER TIME', order.orderTime); // order orderTime
    console.log('ORDER COST', order.totalCostCents); // order totalCostCents
    console.log('ORDER PRODUCT 1', order.products); // access specific product 
    console.log('ORDER PRODUCT 1', order.products[1].quantity); 

  } catch (error) {
    console.log('ERROR "POST-REQUEST" at place order', error);
  }

} */

/* const ordersData = JSON.parse(localStorage.getItem('orders')) || [];

function addOrder(order) {

  // put the recent order to the beginning = orders[0]
  ordersData.unshift(order);

  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(ordersData));
}  */



/* export class Order {
  orderItem = [];

  localKeyStorage;

  constructor(localStorageKey) {
		this.localStorageKey = localStorageKey;
		this.initOrder(); // initialize automatically
	}

  initOrder() {
		const data = JSON.parse(localStorage.getItem(this.localStorageKey));

    if (typeof data === 'object' && !Array.isArray(data)) {
      this.orderItem = data.products; // array of product
    } else {
      this.orderItem = []; // default array
    }

	}

  addOrder(order) {

    // put the recent order to the beginning = 0 index
    orders.unshift(order);
  
    saveToStorage();
  }


  saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(localStorageKey));
  }
}

export const orders = new Order('main-order'); */