import * as AG from 'ag-grid-community';
import { get } from 'svelte/store';

export async function onCellMouseOut(
	event: AG.CellMouseOutEvent,
	cellHoverCard: Grid.CellHoverCard.Store
) {
	if (get(cellHoverCard).rendered) {
		cellHoverCard.set({ rendered: false });
	}
}
