import { copyCell } from '$components/grid/operations/misc/copyCell';

type ModifierKeys = 'ctrlKey' | 'altKey' | 'shiftKey' | 'metaKey';
type ShortcutParams = {
	shortcuts: {
		code: string;
		modifiers?: Partial<Record<ModifierKeys, boolean>>;
		callback: (grid?: Grid.Store) => void;
	}[];
};

export const shortcuts = (grid: Grid.Store): ShortcutParams => ({
	shortcuts: [
		{
			code: 'KeyC',
			modifiers: { metaKey: true },
			callback: () => copyCell(grid)
		}
	]
});
