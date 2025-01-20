import { filterDates } from '$lib/components/grid/helpers/filtering/filterDates';
import { sortDates } from '$lib/components/grid/helpers/sorting/sortDates';
import { formatDate } from '$src/lib/helpers/formatters/dates';
import * as AG from 'ag-grid-community';
import { userPropsGetter } from './componentPropsGetters/cellRender/user';

const roleClassRules = {
	'primary-chip': (params: AG.CellClassParams) => params.value === 'admin',
	'secondary-chip': (params: AG.CellClassParams) => params.value.includes('manager'),
	'dull-chip': (params: AG.CellClassParams) => params.value !== 'admin'
};

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
		colId: 'userEmail',
		field: 'userEmail',
		headerName: 'User',
		floatingFilter: true,
		minWidth: 300,
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
		colId: 'role',
		field: 'role',
		headerName: 'Role',
		floatingFilter: true,
		minWidth: 200,
		cellClassRules: roleClassRules,
		wrapText: false,
		cellDataType: 'text'
	},
	{
		field: 'addedAt',
		headerName: 'Role Added',
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
		headerName: 'Role Updated',
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
