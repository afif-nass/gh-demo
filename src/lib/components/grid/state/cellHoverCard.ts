import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

const CELL_HOVER_CARD_STATE = 'cellHoverCardState';

export function setCellHoverCardState(initialData: Grid.CellHoverCard.State) {
	const cellHoverCardState = writable(initialData);
	return setContext(CELL_HOVER_CARD_STATE, cellHoverCardState);
}

export function getCellHoverCardState() {
	return getContext<Grid.Store>(CELL_HOVER_CARD_STATE);
}
