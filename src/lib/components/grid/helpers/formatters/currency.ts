export function currency(amount: number): string {
	const locale: string = 'en-US';
	const currency: string = 'USD';
	const roundedAmount = Number(amount.toFixed(2)); // Ensure rounding to two decimal places
	return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(roundedAmount);
}
