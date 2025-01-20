export function getSelectedText() {
	let text = '';
	if (window && window.getSelection) {
		text = String(window.getSelection());
	} else {
		const selection = (document as any).selection;
		if (selection && selection.type == 'Text') {
			text = selection.createRange().text;
		}
	}
	return text;
}
