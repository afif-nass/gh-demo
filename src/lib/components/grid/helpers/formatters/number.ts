export function number(num: Number) {
	return num.toLocaleString('en-US', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2
	});
}
