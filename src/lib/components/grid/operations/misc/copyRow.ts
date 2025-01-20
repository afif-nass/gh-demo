import * as AG from 'ag-grid-community';
import * as JSONTransformers from '$components/grid/helpers/transformations/JSONTo';
import { addToast } from '$components/misc/popups/Toaster.svelte';

function friendlyName(format: string) {
	switch (format) {
		case 'tsv':
			return 'TSV';
		case 'json':
			return 'JSON';
	}
	return format;
}

export async function copyRow(format: string, grid: Grid.Store, params: AG.ICellRendererParams) {
	grid.update((state) => {
		const rowData = params.node.data;
		try {
			copyOperation(format, { ...rowData });
			state.api?.flashCells({ rowNodes: [params.node] });
			addToast({
				data: {
					title: 'Success',
					description: 'Copied row as ' + friendlyName(format),
					color: 'green'
				}
			});
		} catch {
			addToast({
				data: {
					title: 'Error',
					description: 'Failed to copy row',
					color: 'red'
				}
			});
		}
		return state;
	});
}

async function copyOperation(copyAction: string, data: JSONTransformers.JsonObject) {
	let targetText = '';
	switch (copyAction) {
		case 'json':
			targetText = JSON.stringify(data, null, 4);
			break;
		case 'tsv':
			targetText = JSONTransformers.jsonToTsv(data);
			break;
		case 'list':
			targetText = JSONTransformers.jsonToList(data);
			break;
	}
	await navigator.clipboard.writeText(targetText);
}
