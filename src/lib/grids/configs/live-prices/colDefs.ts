import * as AG from 'ag-grid-community';
import { assets } from './data';
import * as propsGetters from './componentPropsGetters/cellRender/numbers';

export const colDefs: AG.ColDef[] = [
	{
		field: 'id',
		headerName: 'Ticker',
		cellRenderer: (
			params: AG.ICellRendererParams
		) => `<div class="flex justify-between items-center w-[125px]">
		<img class="h-8 w-8" src=${assets.find((asset) => asset.id === params.value)?.icon} alt="asset" />
		<p class="font-medium text-base">${params.value.toUpperCase()}</p>
	</div>`
	},
	{
		field: 'price',
		cellDataType: 'number',
		minWidth: 200,
		cellRenderer: 'customCellRenderer',
		cellRendererParams: (params: AG.ICellRendererParams) =>
			({
				componentName: 'DeltaValue',
				params,
				propsGetter: propsGetters.pricePropsGetter
			} as Grid.CellRenderer.Def)
	},
	{
		field: 'delta',
		headerName: 'Change Since 24h',
		cellDataType: 'number',
		minWidth: 200,
		cellRenderer: 'customCellRenderer',
		cellRendererParams: (params: AG.ICellRendererParams) =>
			({
				componentName: 'DeltaValue',
				params,
				propsGetter: propsGetters.deltaPropsGetter
			} as Grid.CellRenderer.Def)
	},
	{
		field: 'open',
		headerName: 'Open (-24H)',
		cellDataType: 'number',
		minWidth: 200,
		cellRenderer: 'customCellRenderer',
		cellRendererParams: (params: AG.ICellRendererParams) =>
			({
				componentName: 'DeltaValue',
				params,
				propsGetter: propsGetters.pricePropsGetter
			} as Grid.CellRenderer.Def)
	},
	{
		field: 'high',
		cellDataType: 'number',
		minWidth: 200,
		cellRenderer: 'customCellRenderer',
		cellRendererParams: (params: AG.ICellRendererParams) =>
			({
				componentName: 'DeltaValue',
				params,
				propsGetter: propsGetters.pricePropsGetter
			} as Grid.CellRenderer.Def)
	},
	{
		field: 'low',
		cellDataType: 'number',
		minWidth: 200,
		cellRenderer: 'customCellRenderer',
		cellRendererParams: (params: AG.ICellRendererParams) =>
			({
				componentName: 'DeltaValue',
				params,
				propsGetter: propsGetters.pricePropsGetter
			} as Grid.CellRenderer.Def)
	}
];
