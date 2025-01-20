import { filterDates } from '$lib/components/grid/helpers/filtering/filterDates';
import { sortDates } from '$lib/components/grid/helpers/sorting/sortDates';
import { formatDate } from '$src/lib/helpers/formatters/dates';
import * as AG from 'ag-grid-community';
import { userPropsGetter } from './componentPropsGetters/cellRender/user';

export const colDefs: AG.ColDef[] = [
	{
		field: 'id',
		headerName: 'ID',
		floatingFilter: true,
		checkboxSelection: true,
		headerCheckboxSelection: true,
		headerCheckboxSelectionFilteredOnly: true,
		wrapText: false,
		maxWidth: 120,
		cellDataType: 'text'
	},
	{
		colId: 'name',
		field: 'userEmail',
		headerName: 'Name',
		floatingFilter: true,
		cellRenderer: 'customCellRenderer',
		cellRendererParams: (params: AG.ICellRendererParams) =>
			({
				params,
				componentName: 'User',
				propsGetter: userPropsGetter
			} as Grid.CellRenderer.Def),
		cellDataType: 'text'
	},
	{
		field: 'userEmail',
		headerName: 'Email',
		floatingFilter: true,
		minWidth: 300,
		cellDataType: 'text'
	},
	{
		field: 'addedAt',
		minWidth: 200,
		floatingFilter: true,
		filter: 'agDateColumnFilter',
		valueFormatter: (params) => String(formatDate(params.value, 'friendly')),
		filterParams: {
			debounceMs: 0,
			comparator: (selectedDate: Date, cellValue: string) => {
				return filterDates(selectedDate, cellValue);
			}
		},
		comparator: (
			valueA: any,
			valueB: any,
			nodeA: AG.IRowNode<any>,
			nodeB: AG.IRowNode<any>,
			isDescending: boolean
		) => {
			return Number(sortDates(valueA, valueB));
		},
		cellDataType: 'date'
	},
	{
		field: 'updatedAt',
		floatingFilter: true,
		minWidth: 200,
		filter: 'agDateColumnFilter',
		valueFormatter: (params) => String(formatDate(params.value, 'friendly')),
		filterParams: {
			debounceMs: 0
		},
		cellDataType: 'date'
	}
];
