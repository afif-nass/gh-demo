import * as AG from 'ag-grid-community';
import { CustomCellRenderer } from '$components/grid/AGManager/cellRenderer';
import { TooltipRenderer } from '$src/lib/components/grid/AGManager/tooltipRenderer';
import { onCellClicked } from '$components/grid/AGEventHandlers/onCellClicked';
import { currency } from '$components/grid/helpers/formatters/currency';
import { percent } from '$components/grid/helpers/formatters/percent';
import { onCellMouseOut } from '$components/grid/AGEventHandlers/onCellMouseOut';
import { onFilterChanged } from '$components/grid/AGEventHandlers/onFilterChanged';
import { onGridReady } from '$components/grid/AGEventHandlers/onGridReady';
import { onModelUpdated } from '$components/grid/AGEventHandlers/onModelUpdated';
import { onSelectionChanged } from '$components/grid/AGEventHandlers/onSelectionChanged';
import { onCellMouseOver } from '$components/grid/AGEventHandlers/onCellMouseOver';
import { onFirstDataRendered } from '$components/grid/AGEventHandlers/onFirstDataRendered';
import { defaultColDef } from './defaultColDef';
import { getHoverComponents } from '$components/grid/helpers/misc/gridOptions/hoverComponents';
import { get } from 'svelte/store';

export async function defaultGridOptions(
	grid: Grid.Store,
	cellHoverCard: Grid.CellHoverCard.Store,
	drawer: App.State.DrawerStore
) {
	function customEventFuncs(event: string) {
		const eventFuncs = get(grid).props?.eventFuncs ?? {};
		const func = eventFuncs[event];
		if (!func) return;
		func(grid);
	}
	const hoverComponents = await getHoverComponents(grid);
	const options = {
		onGridReady: (e) => {
			onGridReady(e);
			customEventFuncs('onGridReady');
		},
		onCellClicked: (e) => {
			onCellClicked(e);
			customEventFuncs('onCellClicked');
		},
		onSelectionChanged: (e) => {
			onSelectionChanged(e);
			customEventFuncs('onSelectionChanged');
		},
		onFirstDataRendered: (e) => {
			onFirstDataRendered(e);
			customEventFuncs('onFirstDataRendered');
		},
		onFilterChanged: (e) => {
			onFilterChanged(e);
			customEventFuncs('onFilterChanged');
		},
		onModelUpdated: (e) => {
			onModelUpdated(e);
			customEventFuncs('onModelUpdated');
		},
		onCellMouseOver: (event: AG.CellMouseOverEvent) => {
			onCellMouseOver(event, cellHoverCard, hoverComponents);
		},
		onCellMouseOut: (event: AG.CellMouseOutEvent) => {
			onCellMouseOut(event, cellHoverCard);
		},
		columnTypes: {
			number: {
				filter: 'agNumberColumnFilter',
				cellStyle: {
					textAlign: 'right',
					justifyContent: 'flex-end'
				}
			},
			currency: {
				valueFormatter: (params) => currency(params.value),
				floatingFilter: false,
				cellClass: '!text-right',
				filter: 'agNumberColumnFilter'
			},
			percent: {
				valueFormatter: (params) => percent(params.value),
				cellClass: '!text-right',
				filter: 'agNumberColumnFilter'
			}
		},
		suppressClickEdit: true,
		components: {
			customCellRenderer: CustomCellRenderer,
			tooltipRenderer: TooltipRenderer
		},
		context: { grid, drawer },
		pagination: false,
		asyncTransactionWaitMillis: 0,
		animateRows: true,
		suppressMenuHide: true,
		autoSizeStrategy: {
			type: 'fitCellContents'
		},
		enableCellTextSelection: true,
		ensureDomOrder: false,
		tooltipMouseTrack: true,
		tooltipInteraction: true,
		tooltipShowDelay: 5,
		suppressAnimationFrame: false,
		suppressMovableColumns: false,
		suppressColumnVirtualisation: true,
		rowSelection: 'multiple',
		suppressRowTransform: true,
		suppressRowClickSelection: true,
		defaultColDef
	} as AG.GridOptions;
	return options;
}
