import * as AG from 'ag-grid-community';
import type { SalesTeamMemberPerformance } from './data';
import { userPropsGetter } from './componentPropsGetters/cellRender/user';
import { progressBarPropsGetter } from './componentPropsGetters/cellRender/progressBar';
import { gaugePropsGetter } from './componentPropsGetters/cellRender/gauge';
import { iconListPropsGetter } from './componentPropsGetters/cellRender/iconList';

type AllowedFields = keyof SalesTeamMemberPerformance;
type RestrictedColDef = Omit<AG.ColDef, 'field'> & { field: AllowedFields };

export const colDefs: RestrictedColDef[] = [
	{
		field: 'name',
		minWidth: 200,
		cellDataType: 'text',
		cellRenderer: 'customCellRenderer',
		cellRendererParams: (params: AG.ICellRendererParams) =>
			({
				componentName: 'User',
				params,
				propsGetter: userPropsGetter
			} as Grid.CellRenderer.Def),
		checkboxSelection: true,
		headerCheckboxSelection: true
	},
	{
		colId: 'progress',
		field: 'progress',
		minWidth: 300,
		cellDataType: 'number',
		filter: 'agNumberColumnFilter',
		cellRenderer: 'customCellRenderer',
		cellRendererParams: (params: AG.ICellRendererParams) =>
			({
				componentName: 'ProgressBar',
				params,
				propsGetter: progressBarPropsGetter
			} as Grid.CellRenderer.Def)
	},
	{
		field: 'conversionRate',
		cellDataType: 'number',
		cellRenderer: 'customCellRenderer',
		cellRendererParams: (params: AG.ICellRendererParams) =>
			({
				componentName: 'Gauge',
				params,
				propsGetter: gaugePropsGetter
			} as Grid.CellRenderer.Def),
		type: 'percent'
	},
	{
		field: 'opportunities',
		minWidth: 300,
		sortable: false,
		valueFormatter: (params) => JSON.stringify(params.value),
		cellRenderer: 'customCellRenderer',
		cellRendererParams: (params: AG.ICellRendererParams) =>
			({
				componentName: 'IconList',
				params,
				propsGetter: iconListPropsGetter
			} as Grid.CellRenderer.Def),
		filter: false
	},
	{
		field: 'region',
		cellRenderer: (params: AG.ICellRendererParams) =>
			`<img style="width: 100px;" src="/misc/regions/us/${params.value.toLowerCase()}.svg" />`
	},
	{
		field: 'sales',
		type: 'currency',
		cellDataType: 'number'
	},
	{
		field: 'target',
		type: 'currency',
		cellDataType: 'number'
	}
];
