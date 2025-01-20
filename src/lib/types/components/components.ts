import type { SvelteComponent, ComponentType, ComponentProps } from 'svelte';
import type { Writable } from 'svelte/store';
import type { MimeType as MimeTypeAlias } from './mimes';
import { fieldTypeArray } from './fields';

declare global {
	namespace App {
		namespace Components {
			type ComponentDef = {
				name: string;
				dir?: string;
				props?: object;
			};
			type ImageCardDef = {
				title: string;
				description?: string;
				hidden?: boolean;
				imageOnly?: boolean;
				imageUrl?: string;
				component?: any;
				url?: string;
			};
			type Button = {
				text?: { default: string; loading?: string };
				rounded?: SiteInfo['btnRadius'];
				style?: 'gradient' | 'solid' | 'border' | 'shadow' | 'danger';
				type?: 'button' | 'reset' | 'submit';
				link?: {
					href: string;
					target?: 'self' | '_blank' | '_parent' | '_top';
				};
				leftAligned?: boolean;
				location?: 'hero' | 'nav';
				icon?: {
					component: ComponentType;
					props?: {
						color?: string;
						size?: number | string;
						stroke?: number | string;
						class?: string;
					};
					rightSide?: boolean;
				};
				onClickFunc?: Function;
			};
			namespace Form {
				type Response = {
					success: boolean;
					data?: Record<string, any>;
				};
				namespace SubmitButton {
					type Text = {
						default: string;
						submitting: string;
					};
					type Config = {
						confirm: boolean;
						text: Text;
					};
					interface $$Props {
						props: App.Components.Button;
						loading?: boolean;
						focus: () => void;
					}
					interface $$Slots {}
					interface $$Events {}
				}
				type FormState = {
					submitting: boolean;
					submitted: boolean;
					submitBtnFocused: boolean;
					response: Response;
				};
				type FormStore = Writable<Components.Form.FormState>;
			}
			namespace Field {
				type FieldTypes = (typeof fieldTypeArray)[number];
				type FieldConfig = {
					min?: number | string;
					max?: number | string;
					step?: number;
					allowedFileTypes?: MimeType[];
					allowMultipleFiles?: boolean;
					classes?: string;
				};
				type FieldDefinition = {
					name: string;
					fieldType: FieldTypes;
					id: string;
					uid?: string;
					required?: boolean;
					hideLabel?: boolean;
					help?: string;
					asNumber?: boolean;
					asObject?: boolean;
					placeholder?: any;
					defaultValue?: any;
					component?: Components.ComponentDef;
					valueOptions?: Record<string, any>;
					config?: FieldConfig;
				};
				type FieldMap = {
					[key: string]: FieldDefinition;
				};
				type MimeType = MimeTypeAlias;
			}
			namespace Tabs {
				type TabItem = {
					label: string;
					icon?: ComponentType;
				};
			}
		}
	}
}

export {};
