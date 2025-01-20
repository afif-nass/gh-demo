import type { ComponentType } from 'svelte';
import type { Writable } from 'svelte/store';

declare global {
	namespace App {
		namespace State {
			type Mouse = { pos: { x: number; y: number } };
			interface MouseStore extends Writable<Mouse> {
				updatePos: (e: MouseEvent) => void;
			}
			interface MobileMenu {
				iconVisible: boolean;
				menuVisible: boolean;
			}
			interface MobileMenuStore extends Writable<MobileMenu> {
				updateVisibility: (item: 'icon' | 'menu', isVisible: boolean) => void;
			}
			type Drawer = {
				visible: boolean;
				component?: { self: ComponentType; props?: Record<string, any> };
			};
			type Alert = {
				visible: boolean;
				title: string;
				description: string;
			};
			type AlertStore = Writable<Alert>;
			type DrawerStore = Writable<Drawer>;
			type Title = { title: string; hidden?: boolean };
		}
	}
}

export {};
