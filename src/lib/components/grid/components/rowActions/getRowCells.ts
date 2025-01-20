import * as AG from 'ag-grid-community';
import { get } from 'svelte/store';
import { type RowActionsState } from '$components/grid/state/rowActions';

export function getCells(state: RowActionsState) {
	const row = state.props.node;
	const api = state.props.api;
	const grid = get(state.props.context.grid as Grid.Store);
	const actions = grid.props.actions ?? {};
	let colDefs = api?.getColumnDefs() as AG.ColDef[];
	const onlyMaximize = Object.keys(actions).length === 1 && actions?.maximize;
	if (onlyMaximize) {
		colDefs = colDefs.filter((colDef) => colDef.colId !== 'actions');
	}
	const cells = colDefs.reduce((cellMap: Record<string, any>, def) => {
		const headerName = def.headerName;
		const field = def.colId;
		const id = String(def.colId);

		function getCellRenderer() {
			return (
				api?.getCellRendererInstances({
					rowNodes: [row],
					columns: [id]
				}) ?? []
			);
		}

		const cellRendererInstances = getCellRenderer();

		const cellValue = api?.getCellValue({
			rowNode: row,
			colKey: id,
			useFormatter: true
		});

		let cell = undefined;
		if (cellRendererInstances.length > 0) {
			const cellRendererInstance = cellRendererInstances[0] as any;
			const cellDef = cellRendererInstance.def;
			const cellParams = cellDef?.params;
			if (cellParams && cellDef.componentName) {
				cell = {
					cellRendererDef: {
						params: cellParams,
						componentName: cellDef.componentName,
						propsGetter: cellDef.propsGetter,
						componentFolder: cellDef.componentFolder
					} as Grid.CellRenderer.Def
				};
			} else if (cellRendererInstance) {
				cell = { element: cellRendererInstance.eGui };
			}
		}

		cellMap[headerName || field || ''] = { cell: cell ?? cellValue ?? '', getCellRenderer };

		return cellMap;
	}, {});
	return cells;
}
