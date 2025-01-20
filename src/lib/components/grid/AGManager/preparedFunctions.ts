import * as AG from 'ag-grid-community';

export class PreparedFunctions {
	private gridStore: Grid.State | null = null;
	private unsubscribe: () => void;

	constructor(grid: Grid.Store) {
		this.unsubscribe = grid.subscribe((state: Grid.State) => {
			this.gridStore = state;
		});
	}

	// Using an arrow function here to ensure `this` is bound correctly when the method is called
	public doesExternalFilterPass = (node: AG.IRowNode<any>): boolean => {
		if (!this.gridStore?.props?.externalFilters?.nodeFilter) return false;
		const rowPassesFilter = this.gridStore?.props?.externalFilters?.nodeFilter(
			this.gridStore.props?.externalFilters.current!,
			node
		);
		return rowPassesFilter ?? false;
	};

	// Using an arrow function here to ensure `this` is bound correctly when the method is called
	public isExternalFilterPresent = (): boolean => {
		return this.gridStore?.props?.externalFilters?.current?.length ? true : false;
	};

	public destroy(): void {
		this.unsubscribe();
	}
}
