import { currency } from '$components/grid/helpers/formatters/currency';
import { formatDate } from '$lib/helpers/formatters/dates';

export function tablePropsGetter(
	params: Grid.CellHoverCard.Params
): Grid.CustomComponents.TableProps {
	const rowData = params.data;
	const headers = ['Date', 'Actual', 'Expected'];
	let rows: any[] = getRows(rowData['recentDelivery']);
	return { headers, rows };
}

function getRows(recentDelivery: Grid.CustomComponents.RecentDeliveryProps[]) {
	let rows = recentDelivery.map((row: any) => ({
		date: row.date,
		formattedRow: [
			formatDate(row.date, 'friendly-no-time'),
			currency(row.actual),
			currency(row.expected)
		]
	}));
	rows.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
	rows = rows.map((row: any) => row.formattedRow);
	return rows;
}
