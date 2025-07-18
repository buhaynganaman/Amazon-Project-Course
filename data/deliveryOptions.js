import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const deliveryData = [
  {
    id: '1',
    deliveryDays: 7,
    shippingPriceCents: 0,
  },
  {
    id: '2',
    deliveryDays: 3,
    shippingPriceCents: 499,
  },
  {
    id: '3',
    deliveryDays: 1,
    shippingPriceCents: 999,
  },
];

class Delivery {
  constructor(options) {
    this.options = options; // Inject the data (dependency injection style)
  }

  getDeliveryOption(deliveryOptionId) {
    return this.options.find(option => option.id === deliveryOptionId) || this.options[0];
  }

  calculateDeliveryDate(deliveryDays) {
    const weekends = ['Saturday', 'Sunday'];

    let deliveryDate = dayjs().add(deliveryDays, 'days'); // Calculate delivery date
    let deliveryDateFormat = deliveryDate.format('dddd'); // Format date

		// While loop to skip weekends
    while (weekends.includes(deliveryDateFormat)) {
      deliveryDate = deliveryDate.add(1, 'days'); // add one day to skip weekends
      deliveryDateFormat = deliveryDate.format('dddd'); // Update format
    }

    return deliveryDate.format('dddd, MMMM D'); // Ex. Monday, January 1
  }
}

export const delivery = new Delivery(deliveryData);

export function getDeliveryDetails(deliveryOptionId) {

  const deliveryOption = delivery.getDeliveryOption(deliveryOptionId);
  const deliveryDateFormat = delivery.calculateDeliveryDate(deliveryOption.deliveryDays);

  return deliveryDateFormat;
}