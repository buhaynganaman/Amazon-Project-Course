import { cart } from "./cart-class.js";
import { readableDate } from "../scripts/utils/date & time/date.js";
import { formatCurrency } from "../scripts/utils/money format/money.js";

export async function placeOrder() {
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
    orders.addOrder(order);
  } catch (error) {
    console.log('ERROR "POST-REQUEST" at place order', error);
  }
}


class ProductItem {
  constructor(data) {
    this.data = data;
  }

  getProductId() {
    return this.data.productId;
  }

  getDeliveryDate() {
    return readableDate(this.data.estimatedDeliveryTime);
  }

  getQuantity() {
    return this.data.quantity;
  }
}

class OrderItem {
  constructor(data) {
    this.data = data;
    this.products = data.products.map(product => new ProductItem(product));
  }

  getId() {
    return this.data.id;
  }

  getDate() {
    return readableDate(this.data.orderTime);
  }

  getTotal() {
    return `$${formatCurrency(this.data.totalCostCents)}`;
  }

  getProducts() {
    return this.products;
  }
}

class Orders {
  ordersData = [];

  constructor() {
    this.ordersData = JSON.parse(localStorage.getItem("ordersData")) || [];
  }

  addOrder(order) {
    this.ordersData.unshift(order);
    this.saveToStorage();
  }

  saveToStorage() {
    localStorage.setItem("ordersData", JSON.stringify(this.ordersData));
  }

  getOrders() {
    return this.ordersData.map(orderData => new OrderItem(orderData));
  }
}

export const orders = new Orders();



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