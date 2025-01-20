import * as AG from 'ag-grid-community';
import { get } from 'svelte/store';

export function onModelUpdated(event: AG.ModelUpdatedEvent) {
	const grid = event.context.grid as Grid.Store;
	const gridState = get(grid);
	if (gridState.api?.isDestroyed()) return;
	grid.update((state) => {
		state.rowCounts.displayed = Number(state.api?.getDisplayedRowCount());
		return state;
	});
}
