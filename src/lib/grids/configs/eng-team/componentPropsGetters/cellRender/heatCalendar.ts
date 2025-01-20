export function heatCalendarPropsGetter(
	params: Grid.CellRenderer.Params
): Grid.CustomComponents.HeatCalendarProps {
	const data = params.value;
	return { data };
}
