type ModifierKeys = 'ctrlKey' | 'altKey' | 'shiftKey' | 'metaKey';

type ShortcutParams = {
	shortcuts: {
		code: string;
		modifiers?: Partial<Record<ModifierKeys, boolean>>;
		callback: () => void;
	}[];
};

export const shortcut = (node: HTMLElement, params: ShortcutParams) => {
	const handleKeyDown = (e: KeyboardEvent) => {
		params.shortcuts.forEach((shortcut) => {
			const modifiersMatch = (modifier: ModifierKeys) =>
				shortcut.modifiers?.[modifier] === undefined ||
				shortcut.modifiers[modifier] === e[modifier];
			if (
				e.code === shortcut.code &&
				modifiersMatch('ctrlKey') &&
				modifiersMatch('altKey') &&
				modifiersMatch('shiftKey') &&
				modifiersMatch('metaKey')
			) {
				e.preventDefault();
				shortcut.callback();
			}
		});
	};

	window.addEventListener('keydown', handleKeyDown);

	return {
		destroy() {
			window.removeEventListener('keydown', handleKeyDown);
		}
	};
};
