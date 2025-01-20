export function gaugePropsGetter(
	params: Grid.CellRenderer.Params
): Grid.CustomComponents.GaugeProps {
	const value = params.value;
	return {
		min: 18,
		max: 37,
		palette: 'bad-good',
		value
	};
}
