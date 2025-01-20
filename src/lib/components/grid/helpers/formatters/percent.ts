export function percent(
	value: number,
	isAlreadyPercent: boolean = false,
	precision: 0 | 1 | 2 | 3 = 0
): string {
	if (value > 1) {
		return value.toFixed(precision) + '%';
	}
	const percentValue = isAlreadyPercent ? value : value * 100;
	return `${percentValue.toFixed(0)}%`;
}
