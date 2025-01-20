export function booleanPropsGetter(
	params: Grid.CellRenderer.Params
): Grid.CustomComponents.BooleanProps {
	const value = params.value;
	return { boolean: value, text: { true: 'Yes', false: 'No' } };
}
