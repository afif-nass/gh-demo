import * as AG from 'ag-grid-community';
import { suppressKeyboardEvent } from '../helpers/keyboard/suppressKeyboardEvent';

export const defaultColDef: AG.ColDef = {
	suppressKeyboardEvent: (params: AG.SuppressKeyboardEventParams) => {
		return suppressKeyboardEvent(params);
	},
	resizable: true,
	filter: 'agTextColumnFilter',
	filterParams: {
		debounceMs: 0
	},
	autoHeight: true,
	floatingFilter: false,
	headerClass: 'text-left tracking-tighter text-text-secondary text-[0.7rem] uppercase py-2',
	maxWidth: 400,
	cellStyle: {
		display: 'flex',
		justifyContent: 'flex-start',
		lineHeight: 1.5,
		alignItems: 'center'
	},
	wrapHeaderText: false,
	autoHeaderHeight: true
};
