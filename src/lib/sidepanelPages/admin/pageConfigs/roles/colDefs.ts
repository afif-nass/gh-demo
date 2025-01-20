import { formatDate } from '$src/lib/helpers/formatters/dates';
import * as AG from 'ag-grid-community';

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
		field: 'name',
		floatingFilter: true,
		wrapText: false,
		cellDataType: 'text'
	},
	{
		field: 'description',
		floatingFilter: true,
		maxWidth: 500,
		wrapText: false,
		cellDataType: 'text'
	},
	{
		field: 'addedAt',
		floatingFilter: true,
		minWidth: 200,
		filter: 'agDateColumnFilter',
		valueFormatter: (params) => String(formatDate(params.value, 'friendly')),
		filterParams: {
			debounceMs: 0
		},
		cellDataType: 'date'
	},
	{
		field: 'expiresAt',
		floatingFilter: true,
		minWidth: 200,
		filter: 'agDateColumnFilter',
		valueFormatter: (params) => String(formatDate(params.value, 'friendly')),
		filterParams: {
			debounceMs: 0
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
