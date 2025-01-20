import * as AG from 'ag-grid-community';

export function onGridReady(event: AG.GridReadyEvent) {
	const grid = event.context.grid as Grid.Store;
	grid.update((state) => {
		if (state.props?.sortParams) {
			state.api?.applyColumnState(state.props.sortParams);
		}
		return state;
	});
}
