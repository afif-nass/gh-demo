import { getContext, setContext } from 'svelte';

const GRID_STATE = 'GRID_STATE';

export function setGridState(gridStore: Grid.Store) {
	setContext(GRID_STATE, gridStore);
}

export function getGridState() {
	return getContext<Grid.Store>(GRID_STATE);
}
