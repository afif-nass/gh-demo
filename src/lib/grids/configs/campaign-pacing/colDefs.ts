import * as AG from 'ag-grid-community';
import type { CampaignDelivery } from './data';
import { statusButtonPropsGetter } from './componentPropsGetters/cellRender/statusButton';
import { booleanPropsGetter } from './componentPropsGetters/cellRender/boolean';
import { flightProgressPropsGetter } from './componentPropsGetters/cellRender/flightProgress';
import { heatBarPropsGetter } from './componentPropsGetters/cellRender/heatBar';
import { recentDeliveryPropsGetter } from './componentPropsGetters/cellRender/recentDelivery';

type AllowedFields = keyof CampaignDelivery;
type RestrictedColDef = Omit<AG.ColDef, 'field'> & { field: AllowedFields };

export const colDefs: RestrictedColDef[] = [
	{
		field: 'name',
		cellDataType: 'text',
		checkboxSelection: true,
		headerCheckboxSelection: true
	},
	{
		field: 'reviewed',
		cellRenderer: 'customCellRenderer',
		cellDataType: 'boolean',
		cellRendererParams: (params: AG.ICellRendererParams) =>
			({
				params,
				componentName: 'StatusButton',
				propsGetter: statusButtonPropsGetter
			} as Grid.CellRenderer.Def)
	},
	{
		field: 'fullDeliveryLikely',
		cellRenderer: 'customCellRenderer',
		cellRendererParams: (params: AG.ICellRendererParams) =>
			({
				params,
				componentName: 'Boolean',
				propsGetter: booleanPropsGetter
			} as Grid.CellRenderer.Def),
		editable: false
	},
	{
		colId: 'recentDelivery',
		field: 'recentDelivery',
		filter: false,
		sortable: false,
		valueFormatter: (params) => JSON.stringify(params.value),
		cellRenderer: 'customCellRenderer',
		cellRendererParams: (params: AG.ICellRendererParams) =>
			({
				params,
				componentName: 'RecentDelivery',
				propsGetter: recentDeliveryPropsGetter
			} as Grid.CellRenderer.Def)
	},
	{
		colId: 'paceIndicator',
		field: 'paceIndicator',
		minWidth: 300,
		cellRenderer: 'customCellRenderer',
		cellRendererParams: (params: AG.ICellRendererParams) =>
			({
				params,
				componentName: 'HeatBar',
				propsGetter: heatBarPropsGetter
			} as Grid.CellRenderer.Def),
		filter: 'agNumberColumnFilter',
		cellDataType: 'number'
	},
	{
		colId: 'flightProgress',
		field: 'flightProgress',
		minWidth: 300,
		cellRenderer: 'customCellRenderer',
		cellRendererParams: (params: AG.ICellRendererParams) =>
			({
				params,
				componentName: 'FlightProgress',
				propsGetter: flightProgressPropsGetter
			} as Grid.CellRenderer.Def),
		filter: false,
		cellDataType: 'number'
	},
	{ field: 'actualSpend', cellDataType: 'number', type: 'currency' },
	{ field: 'expectedSpend', cellDataType: 'number', type: 'currency' },
	{ field: 'flightTargetSpend', cellDataType: 'number', type: 'currency' }
];
