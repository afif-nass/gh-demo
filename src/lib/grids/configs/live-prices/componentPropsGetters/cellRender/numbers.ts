export function deltaPropsGetter(
	params: Grid.CellRenderer.Params
): Grid.CustomComponents.DeltaProps {
	return {
		value: params.value,
		format: 'percent'
	};
}

export function pricePropsGetter(
	params: Grid.CellRenderer.Params
): Grid.CustomComponents.DeltaProps {
	return {
		value: params.value,
		format: 'currency'
	};
}
