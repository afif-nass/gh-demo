import { get } from 'svelte/store';
import { handleAPIResponse } from '../serverResponses/handleAPIResponse';

export async function deleteRows(grid: Grid.Store, bulk: boolean = false) {
	const state = get(grid);
	const actionConfig = state.props?.actions?.deleteRecords;
	if (!actionConfig || !('endpoint' in actionConfig)) {
		return;
	}
	if (!confirm('Are you sure you want to delete?')) {
		return;
	}
	try {
		grid.update((state) => {
			state.mutateAction = 'Delete';
			return state;
		});
		const fetchURL = String(actionConfig.endpoint);
		const deleteRows = grid.getRows('selected');
		handleAPIResponse({ success: true }, grid);
	} catch (e) {}
	return;
}
