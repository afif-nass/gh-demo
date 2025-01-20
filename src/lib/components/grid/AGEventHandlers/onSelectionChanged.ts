import * as AG from 'ag-grid-community';

export function onSelectionChanged(event: AG.SelectionChangedEvent) {
	const grid = event.context.grid as Grid.Store;
	grid.update((state) => {
		const selectedRows = state.api?.getSelectedRows() || [];
		state.rowCounts.selected = Number(selectedRows.length);
		return state;
	});
}
