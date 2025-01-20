import { getSelectedText } from '$src/lib/helpers/app/getSelectedText';
import { addToast } from '$components/misc/popups/Toaster.svelte';

// Helper function to perform a deep copy
function deepCopy(obj: any): any {
	if (typeof obj !== 'object' || obj === null) {
		return obj;
	}

	const copy: any = Array.isArray(obj) ? [] : {};

	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			copy[key] = deepCopy(obj[key]);
		}
	}

	return copy;
}

export function copyCell(grid: Grid.Store) {
	grid.update((state) => {
		const selectedText = getSelectedText();
		if (selectedText.length) {
			navigator.clipboard.writeText(selectedText);
			return state;
		}

		const focusedCell = state.api?.getFocusedCell();
		if (!focusedCell || state.api?.getColumnDef(focusedCell.column)?.field === 'actions') {
			return state;
		}

		const row = state.api?.getDisplayedRowAtIndex(focusedCell.rowIndex);
		if (!row) return state;

		const cellValue = state.api?.getCellValue({
			rowNode: row,
			colKey: focusedCell.column,
			useFormatter: true
		});

		if (!cellValue) {
			errorToast();
			return state;
		}

		try {
			// Perform a deep copy of the cell value if it's an object
			const deepCopiedValue = deepCopy(cellValue);
			navigator.clipboard.writeText(String(deepCopiedValue));
			state.api?.flashCells({ rowNodes: [row], columns: [focusedCell.column] });
			addToast({
				data: {
					title: 'Success',
					description: 'Copied cell',
					color: 'red'
				}
			});
		} catch {
			errorToast();
		}

		return state;
	});
}

function errorToast() {
	addToast({
		data: {
			title: 'Error',
			description: 'Failed to copy cell',
			color: 'red'
		}
	});
}
