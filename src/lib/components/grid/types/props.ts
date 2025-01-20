import * as AG from 'ag-grid-community';
import type { ComponentType } from 'svelte';

declare global {
	namespace Grid {
		type Props = {
			data: Record<string, any>[];
			colDefs: AG.ColDef[];
			options: AG.GridOptions;
			showSearchBar?: boolean;
			eventFuncs?: Record<string, (grid: Store) => void>;
			destroyFuncs?: (() => void)[];
			actions?: Grid.Actions;
			aboveGridComponent?: {
				self: ComponentType;
				props?: Record<string, any>;
			};
			externalFilters?: {
				names?: string[];
				initial?: string;
				class?: any;
				current?: string;
				nodeFilter?: (selectedFilter: string, node: AG.IRowNode<any>) => boolean;
			};
			cellHoverCards?: Grid.CellHoverCard.Def[];
			sortParams?: AG.ApplyColumnStateParams;
		};
	}
}

export {};
