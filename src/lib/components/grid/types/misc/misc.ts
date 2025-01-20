import * as AG from 'ag-grid-community';
import { type ComponentType } from 'svelte';
import type { Writable } from 'svelte/store';

declare global {
	namespace Grid {
		type Def = {
			title: string;
			description?: string;
			hidden?: boolean;
			hideTitle?: boolean;
			configFolder: string;
			imageUrl?: string;
			serverData?: boolean;
		};
		type Event = { name: string; data?: any };
		type EventCallback = (event: Grid.Event) => void;
		type FormParams = {
			fetchURL: string;
			submissionConfig: App.Components.Form.SubmitButton.Config;
		};
		namespace CellRenderer {
			type Params = AG.ICellRendererParams;
			interface Def {
				params: Params;
				componentName: string;
				propsGetter: (params: Params) => CustomComponents.CustomComponentProps;
				componentFolder?: 'default' | 'grid';
			}
		}
		namespace CellHoverCard {
			type Params = AG.CellMouseOverEvent;
			interface Def {
				colId: string;
				componentName: string;
				propsGetter: (params: Params) => CustomComponents.CustomComponentProps;
			}
			type Map = Record<
				string,
				{
					component: ComponentType;
					propsGetter: (params: Params) => CustomComponents.CustomComponentProps;
				}
			>;
			interface State {
				component?: ComponentType;
				rendered: boolean;
				props?: Grid.CustomComponents.CustomComponentProps;
			}
			type Store = Writable<State>;
		}
		namespace Tooltip {
			interface Params {
				params: AG.ITooltipParams;
				componentName: string;
				propsGetter: (params: Grid.Tooltip.Params) => CustomComponents.CustomComponentProps;
			}
		}
	}
}
