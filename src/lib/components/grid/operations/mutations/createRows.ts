export async function createRows(grid: Grid.Store, bulk: boolean = false) {
	grid.update((state) => {
		const actionConfig = state.props?.actions?.createRecords;
		if (!actionConfig || !('endpoint' in actionConfig)) {
			return state;
		}
		state.mutateAction = 'Create';
		state.modal.title = actionConfig.single.modalTitle || 'New record';
		state.modal.fields = structuredClone(
			state.props?.actions?.createRecords?.single.modalInputFields || []
		);
		state.modal.form.fetchURL = String(actionConfig.endpoint);
		state.modal.form.submissionConfig = {
			confirm: false,
			text: {
				default: 'Create',
				submitting: 'Creating record...'
			}
		};
		state.modal.visible = true;
		return state;
	});
}
