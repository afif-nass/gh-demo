export function heatBarPropsGetter(
	params: Grid.CellRenderer.Params
): Grid.CustomComponents.HeatBarProps {
	const value = params.value;
	return { value };
}
