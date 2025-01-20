export function statusButtonPropsGetter(
	params: Grid.CellRenderer.Params
): Grid.CustomComponents.StatusButtonProps {
	const value = params.value;
	return {
		text: { true: 'Reviewed', false: 'Unreviewed' },
		row: params.node,
		fieldName: params.colDef?.field,
		boolean: value
	} as Grid.CustomComponents.StatusButtonProps;
}
