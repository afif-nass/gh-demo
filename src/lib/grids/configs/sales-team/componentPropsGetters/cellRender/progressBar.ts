import { currency } from '$components/grid/helpers/formatters/currency';

export function progressBarPropsGetter(
	params: Grid.CellRenderer.Params
): Grid.CustomComponents.ProgressBarProps {
	const cellValue = params.value;
	const rowData = params.data;
	return {
		barColor: getColor(cellValue),
		minLabel: '$0',
		percent: Math.max(0, Math.min(cellValue, 100)),
		targetLabel: currency(rowData['target'])
	};
}

function getColor(percent: number) {
	if (percent > 80) {
		return 'from-emerald-300 to-affirmative-primary';
	} else if (percent >= 50 && percent < 80) {
		return 'from-amber-50 to-warning-primary';
	} else {
		return 'from-red-50 to-destructive-primary';
	}
}
