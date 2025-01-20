export const USDollar = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 0, // No decimal places
	minimumFractionDigits: 0 // Ensures rounding to whole number
});
