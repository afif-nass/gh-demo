import * as AG from 'ag-grid-community';

export function getAllFocusableElementsOf(el: HTMLElement) {
	const elements = Array.from<HTMLElement>(
		el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
	);
	return elements.filter((focusableEl) => {
		return focusableEl.tabIndex !== -1;
	});
}

export const getEventPath: (event: Event) => HTMLElement[] = (event: Event) => {
	const path: HTMLElement[] = [];
	let currentTarget: any = event.target;
	while (currentTarget) {
		path.push(currentTarget);
		currentTarget = currentTarget.parentElement;
	}
	return path;
};

/**
 * Capture whether the user is tabbing forwards or backwards and suppress keyboard event if tabbing
 * outside of the children
 */
export function suppressKeyboardEvent(params: AG.SuppressKeyboardEventParams) {
	const eventDetails = params.event;
	const GRID_CELL_CLASSNAME = 'ag-cell';
	const { key, shiftKey } = eventDetails;
	const path = getEventPath(eventDetails);
	const isTabForward = key === 'Tab' && shiftKey === false;
	const isTabBackward = key === 'Tab' && shiftKey === true;
	let suppressEvent = false;
	// Handle cell children tabbing
	if (isTabForward || isTabBackward) {
		const eGridCell = path.find((el) => {
			if (el.classList === undefined) return false;
			return el.classList.contains(GRID_CELL_CLASSNAME);
		});
		if (!eGridCell) {
			return suppressEvent;
		}
		const focusableChildrenElements = getAllFocusableElementsOf(eGridCell);
		const lastCellChildEl = focusableChildrenElements[focusableChildrenElements.length - 1];
		const firstCellChildEl = focusableChildrenElements[0];
		// Suppress keyboard event if tabbing forward within the cell and the current focused element is not the last child
		if (isTabForward && focusableChildrenElements.length > 0) {
			const isLastChildFocused = lastCellChildEl && document.activeElement === lastCellChildEl;
			if (!isLastChildFocused) {
				suppressEvent = true;
			}
		}
		// Suppress keyboard event if tabbing backwards within the cell, and the current focused element is not the first child
		else if (isTabBackward && focusableChildrenElements.length > 0) {
			const cellHasFocusedChildren =
				eGridCell.contains(document.activeElement) && eGridCell !== document.activeElement;
			// Manually set focus to the last child element if cell doesn't have focused children
			if (!cellHasFocusedChildren) {
				lastCellChildEl.focus();
				// Cancel keyboard press, so that it doesn't focus on the last child and then pass through the keyboard press to
				// move to the 2nd last child element
				eventDetails.preventDefault();
			}
			const isFirstChildFocused = firstCellChildEl && document.activeElement === firstCellChildEl;
			if (!isFirstChildFocused) {
				suppressEvent = true;
			}
		}
	}
	return suppressEvent;
}
