import * as datefns from 'date-fns';
import { twConfig } from '$src/theme';

export function tooltipPropsGetter(
	params: Grid.CellHoverCard.Params
): Grid.CustomComponents.TooltipProps {
	const rowData = params.data;
	const daysLeft = calculateDaysLeft(
		rowData['startDate'],
		rowData['endDate'],
		rowData['flightProgress']
	);
	return {
		text: `${daysLeft} days left`,
		color:
			daysLeft < 7 ? twConfig.theme.colors.destructive.primary : twConfig.theme.colors.text.primary
	} as Grid.CustomComponents.TooltipProps;
}

function calculateDaysLeft(start: Date, end: Date, progress: number): number {
	const totalDuration = datefns.differenceInCalendarDays(end, start);
	const elapsedDays = Math.round(totalDuration * (1 - progress));
	return elapsedDays;
}
