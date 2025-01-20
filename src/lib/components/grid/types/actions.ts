import type { ComponentType } from 'svelte';

declare global {
	namespace Grid {
		type Actions = {
			maximize?: boolean;
			copyRow?: boolean;
			rowInfo?: RowInfo;
			download?: boolean;
			query?: QueryConfig;
			createRecords?: CreateRecords;
			updateRecord?: UpdateRecord;
			deleteRecords?: DeleteRecords;
			custom?: CustomAction[];
		};

		type RowInfo = {
			component: ComponentType;
			props?: any;
		};

		type CustomAction = { url?: string; displayName: string };

		type QueryConfig = {
			schema?: string;
		};

		type CreateRecords = {
			single: {
				modalTitle?: string;
				modalInputFields: App.Components.Field.FieldDefinition[];
			};
			bulk?: boolean;
			endpoint: string;
		};

		type UpdateRecord = {
			modalTitle?: string;
			modalInputFields: App.Components.Field.FieldDefinition[];
			endpoint: string;
		};

		type DeleteRecords = {
			single: boolean;
			bulk: boolean;
			endpoint: string;
		};
		namespace RowActionEvents {
			type CopyRowEvent = { event: 'copyRow'; payload: { format: string } };

			type MaximizeEvent = { event: 'maximize'; payload?: Record<string, any> };

			type OpenLinkEvent = { event: 'openLink'; payload: { url: string } };

			type MutateEvent = { event: 'mutate'; payload: { url: string; action: string } };

			type CustomEvent = { event: 'custom'; payload?: Record<string, any> };
			type RowInfoEvent = { event: 'rowInfo'; payload?: any };
		}

		type RowActionsEvent =
			| RowActionEvents.CopyRowEvent
			| RowActionEvents.RowInfoEvent
			| RowActionEvents.MaximizeEvent
			| RowActionEvents.OpenLinkEvent
			| RowActionEvents.MutateEvent
			| RowActionEvents.CustomEvent;
	}
}

export {};
