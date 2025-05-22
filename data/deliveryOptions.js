import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [
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

export function getDeliveryOption(deliveryOptionId) {
	return deliveryOptions.find(option => option.id === deliveryOptionId) || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryDays) {
	const weekends = ['Saturday', 'Sunday'];

		const todayDate = dayjs();
		let deliveryDate = todayDate.add(deliveryDays, 'days'); // Calculate delivery date
		let deliveryDateFormat = deliveryDate.format('dddd'); // Format date

		// While loop to skip weekends
		while (weekends.includes(deliveryDateFormat)) {  
			deliveryDate = deliveryDate.add(1, 'days');
			deliveryDateFormat = deliveryDate.format('dddd'); // Update format
		}

		return deliveryDate.format('dddd, MMMM D');
}