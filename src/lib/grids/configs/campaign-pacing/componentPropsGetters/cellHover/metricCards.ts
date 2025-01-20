import { currency } from '$components/grid/helpers/formatters/currency';
import { percent } from '$components/grid/helpers/formatters/percent';

export function metricCardsPropsGetter(
	params: Grid.CellHoverCard.Params
): Grid.CustomComponents.MetricCardsProps {
	const rowData = params.data;
	return { cards: getCards(rowData) };
}

function getCards(data: any) {
	return [
		{ label: 'Actual Spend', value: currency(data.actualSpend) },
		{ label: 'Expected Spend', value: currency(data.expectedSpend) },
		{
			label: 'Budget Progress',
			value: percent(data.actualSpend / data.flightTargetSpend)
		},
		{ label: 'Flight Progress', value: percent(data.flightProgress) },
		{ label: 'Yesterday OTI', value: demoOTIs.yesterday },
		{ label: '3-DAY OTI', value: demoOTIs.threeDay }
	];
}

function getRandomPercentage(): string {
	const randomPercent = Math.random() * 100;
	return `${randomPercent.toFixed(2)}%`;
}

const demoOTIs = {
	yesterday: getRandomPercentage(),
	threeDay: getRandomPercentage()
};
