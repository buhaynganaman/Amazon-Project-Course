export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {

  // put the recent order to the beginning = 0 index
  orders.unshift(order);

  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}