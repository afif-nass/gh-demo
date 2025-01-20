import * as AG from 'ag-grid-community';
import { userPropsGetter } from './componentPropsGetters/cellRender/user';
import { locPropsGetter, ticketsPropsGetter } from './componentPropsGetters/cellRender/iconList';
import { heatCalendarPropsGetter } from './componentPropsGetters/cellRender/heatCalendar';
import { buttonsPropsGetter } from './componentPropsGetters/cellRender/buttons';

export const colDefs: AG.ColDef[] = [
	{
		headerName: 'Profiles',
		sortable: false,
		filter: false,
		cellRenderer: 'customCellRenderer',
		cellRendererParams: (params: AG.ICellRendererParams) =>
			({
				componentName: 'ButtonList',
				params,
				propsGetter: buttonsPropsGetter
			} as Grid.CellRenderer.Def)
	},
	{
		field: 'name',
		headerName: 'Engineer',
		floatingFilter: true,
		cellDataType: 'text',
		cellRenderer: 'customCellRenderer',
		cellRendererParams: (params: AG.ICellRendererParams) =>
			({
				componentName: 'User',
				params,
				propsGetter: userPropsGetter
			} as Grid.CellRenderer.Def)
	},
	{
		field: 'commits',
		cellDataType: false,
		filter: false,
		valueFormatter: (params) => JSON.stringify(params.value),
		sortable: false,
		cellRenderer: 'customCellRenderer',
		cellRendererParams: (params: AG.ICellRendererParams) =>
			({
				componentName: 'HeatCalendar',
				params,
				propsGetter: heatCalendarPropsGetter
			} as Grid.CellRenderer.Def)
	},
	{
		field: 'linesOfCode',
		cellDataType: false,
		valueFormatter: (params) => JSON.stringify(params.value),
		filter: false,
		sortable: false,
		cellRenderer: 'customCellRenderer',
		cellRendererParams: (params: AG.ICellRendererParams) =>
			({
				componentName: 'IconList',
				params,
				propsGetter: locPropsGetter
			} as Grid.CellRenderer.Def)
	},
	{
		field: 'tickets',
		cellDataType: false,
		valueFormatter: (params) => JSON.stringify(params.value),
		filter: false,
		sortable: false,
		cellRenderer: 'customCellRenderer',
		cellRendererParams: (params: AG.ICellRendererParams) =>
			({
				componentName: 'IconList',
				params,
				propsGetter: ticketsPropsGetter
			} as Grid.CellRenderer.Def)
	},
	{
		field: 'storyPoints',
		type: 'number',
		cellRenderer: (params: AG.ICellRendererParams) =>
			`<p class="text-xl font-bold text-brand-secondary rounded-full py-[2px] px-5 bg-brand-secondaryLight/50 border-[0.25px] border-brand-secondary/20">${params.value}</p>`
	}
];
