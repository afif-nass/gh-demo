import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

type MobileMenu = App.State.MobileMenu;

const MOBILE_MENU = 'MOBILE_MENU';

export function setMobileMenuState(initialData?: MobileMenu) {
	const mobileMenuState = mobileMenu;
	setContext(MOBILE_MENU, mobileMenuState);
	return mobileMenuState;
}

export function getMobileMenuState() {
	return getContext<Writable<MobileMenu>>(MOBILE_MENU);
}

const { subscribe, set, update } = writable<MobileMenu>({
	iconVisible: true,
	menuVisible: false
});

const mobileMenu: App.State.MobileMenuStore = {
	subscribe,
	set,
	update,
	updateVisibility: (item: 'icon' | 'menu', isVisible: boolean) => {
		update((state) => {
			switch (item) {
				case 'icon':
					state.iconVisible = isVisible;
					break;
				case 'menu':
					state.menuVisible = isVisible;
					break;
			}
			return state;
		});
	}
};
