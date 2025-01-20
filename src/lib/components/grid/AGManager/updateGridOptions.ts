import * as AG from 'ag-grid-community';
import { defaultGridOptions } from './defaultGridOptions';
import { PreparedFunctions } from './preparedFunctions';

export async function updateGridOptions(
	grid: Grid.Store,
	cellHoverCard: Grid.CellHoverCard.Store,
	drawer: App.State.DrawerStore
) {
	const preparedFunctions = new PreparedFunctions(grid);
	const defaultOptions = await defaultGridOptions(grid, cellHoverCard, drawer);
	grid.update((state) => {
		state.props.options = { ...defaultOptions, ...state.props.options };

		if (state.props.externalFilters) {
			state.props.externalFilters.class = preparedFunctions;
		}

		state.props.options.rowData = state.props?.data ?? [];
		state.rowCounts.total = state.props?.data?.length ?? 0;
		state.props.options.columnDefs = Object.assign([], state.props?.colDefs);

		if (!state.props?.colDefs) {
			if (state.props?.data && state.props.data.length > 0) {
				state.props.options.columnDefs = Object.keys(state.props.data[0]).map((key) => ({
					field: key
				}));
			}
		}

		state.props.options.defaultCsvExportParams = {
			fileName: 'Data'
		};

		if (state.props.actions) {
			state.props.options.columnDefs?.unshift({
				field: 'actions',
				colId: 'actions',
				cellRenderer: 'customCellRenderer',
				cellRendererParams: (params: AG.ICellRendererParams) =>
					({
						componentName: 'RowActions',
						params,
						propsGetter: (params: Grid.CellRenderer.Params) => {
							return params;
						},
						componentFolder: 'grid'
					} as Grid.CellRenderer.Def),
				cellClass: 'select-none',
				editable: false,
				floatingFilter: false,
				resizable: false,
				sortable: false,
				cellDataType: false,
				filter: false
			} as AG.ColDef);
		}

		if (state.props?.externalFilters?.nodeFilter) {
			state.props.options.doesExternalFilterPass = preparedFunctions.doesExternalFilterPass;
			state.props.options.isExternalFilterPresent = preparedFunctions.isExternalFilterPresent;
		}

		return state;
	});
}
