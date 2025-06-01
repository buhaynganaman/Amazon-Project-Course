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

    let deliveryDate = dayjs().add(deliveryDays, 'days');
    let deliveryDateFormat = deliveryDate.format('dddd');

    while (weekends.includes(deliveryDateFormat)) {
      deliveryDate = deliveryDate.add(1, 'days');
      deliveryDateFormat = deliveryDate.format('dddd');
    }

    return deliveryDate.format('dddd, MMMM D');
  }
}

export const delivery = new Delivery(deliveryData);