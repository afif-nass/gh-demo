import { get } from 'svelte/store';
import { addToast } from '$components/misc/popups/Toaster.svelte';

export function handleFormResponse(formStore: App.Components.Form.FormStore, grid: Grid.Store) {
	let responseMessage = '';
	const formState = get(formStore);
	const data = formState.response.data;
	grid.update((state) => {
		if (state.modal.form.fetchURL.includes('/demo')) {
			state.modal.visible = false;
			addToast({
				data: {
					title: 'Success',
					description: 'Demo mutation: ' + state.mutateAction,
					color: 'green'
				}
			});
			return state;
		}
		try {
			const mutateAction = state.mutateAction;
			if (formState.response.success) {
				if (mutateAction === 'updateRow') {
					if (!data || !('updatedRowData' in data)) {
						throw 'Missing data';
					}
					const updatedRowData = data.updatedRowData;
					state.api?.applyTransaction({
						update: [grid.getRows('selected')[0].rowIndex, updatedRowData]
					});
					responseMessage = 'Updated row';
				} else if (mutateAction === 'createRow') {
					if (!data?.data || (data && !('createdRow' in data))) {
						throw 'Missing data';
					}
					const createdRow = data?.createdRow;
					state.api?.applyTransaction({ addIndex: 0, add: [createdRow] });
					state.rowCounts.total += 1;
					responseMessage = 'Created row';
				}
				state.modal.visible = false;
				addToast({
					data: {
						title: 'Success',
						description: responseMessage,
						color: 'green'
					}
				});
			}
		} catch (e) {
			state.modal.visible = false;
			addToast({
				data: {
					title: 'Error',
					description: 'Something went wrong',
					color: 'red'
				}
			});
		}
		return state;
	});
}
