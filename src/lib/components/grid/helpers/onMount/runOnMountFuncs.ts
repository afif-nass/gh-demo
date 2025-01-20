import { resizeColumns } from './funcs/resizeColumns';

export async function runOnMountFuncs(grid: Grid.Store) {
	await resizeColumns(grid);
}
