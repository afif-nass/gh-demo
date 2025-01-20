export function flightProgressPropsGetter(
	params: Grid.CellRenderer.Params
): Grid.CustomComponents.FlightProgressProps {
	const value = params.value;
	return {
		value,
		dates: { start: params.data['startDate'], end: params.data['endDate'] }
	} as Grid.CustomComponents.FlightProgressProps;
}
