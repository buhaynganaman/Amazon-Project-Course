export function formatCurrency(priceCents) {
	if (priceCents < 0) {
		return "0.00";
	} else {
		return (Math.round(priceCents) / 100).toFixed(2);
	}
}

export function calculate10PercentTax(price) {
	return (price * 0.1).toFixed(2);
}