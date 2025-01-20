import { get } from 'svelte/store';
import { delay } from '$src/lib/helpers/misc/delay';

export async function resizeColumns(gridStore: Grid.Store) {
	const grid = get(gridStore);
	const allCols = grid.api?.getColumns();
	if (!allCols) return;
	const allColKeys = allCols.map((col) => col.getColId() || '');
	await delay(500);
	grid.api?.autoSizeColumns(allColKeys);
	gridStore.update((state) => {
		state.revealed = true;
		return state;
	});
	await delay(500);
	grid.api?.autoSizeColumns(allColKeys);
}
