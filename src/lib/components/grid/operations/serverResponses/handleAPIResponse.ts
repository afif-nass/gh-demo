import { addToast } from '$components/misc/popups/Toaster.svelte';

export function handleAPIResponse(
	result: Server.ExecutionResult = { success: false },
	grid: Grid.Store
) {
	grid.update((state) => {
		const mutateAction = state.mutateAction;
		if (state.props?.actions?.createRecords?.endpoint.includes('/demo')) {
			state.modal.visible = false;
			addToast({
				data: {
					title: 'Success',
					description: 'Demo mutation: ' + mutateAction,
					color: 'green'
				}
			});
			return state;
		}
		try {
			if (mutateAction === 'delete') {
				if (!result.success || !('deletedRows' in result)) {
					throw 'Missing data';
				}
				const deletedRows = result.deletedRows as [];
				state.api?.applyTransaction({ remove: deletedRows });
				addToast({
					data: {
						title: 'Success',
						description: 'Deleted rows',
						color: 'green'
					}
				});
			} else if (mutateAction === 'bulkUpload') {
				if (!result.success || !('createdRows' in result)) {
					throw 'Missing data';
				}
				const createdRows = result.createdRows as [];
				state.api?.applyTransaction({ add: createdRows });
				addToast({
					data: {
						title: 'Success',
						description: 'Uploaded rows',
						color: 'green'
					}
				});
			}
		} catch (e) {
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
