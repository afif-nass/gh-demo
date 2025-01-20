export function updateRow(rowData: Record<string, string>, grid: Grid.Store) {
	grid.update((state) => {
		const actionConfig = state.props?.actions?.updateRecord;
		if (!actionConfig || !('endpoint' in actionConfig)) {
			return state;
		}
		state.mutateAction = 'Update';
		state.modal.title = actionConfig.modalTitle || 'Update record';
		state.modal.fields = structuredClone(
			state.props?.actions?.updateRecord?.modalInputFields || []
		);
		state.modal.fields.forEach((field) => {
			if (field.id && field.id in rowData) {
				field.defaultValue = rowData[field.id as keyof typeof rowData];
			}
		});
		state.modal.form.fetchURL = String(actionConfig.endpoint);
		state.modal.form.submissionConfig = {
			confirm: false,
			text: {
				default: 'Update',
				submitting: 'Updating record...'
			}
		};
		state.modal.visible = true;
		return state;
	});
}
