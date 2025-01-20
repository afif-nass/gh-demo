import { currency } from '$components/grid/helpers/formatters/currency';

export function tooltipPropsGetter(
	params: Grid.CellHoverCard.Params
): Grid.CustomComponents.TooltipProps {
	const rowData = params.data;
	return {
		text: currency(rowData['sales'])
	} as Grid.CustomComponents.TooltipProps;
}
