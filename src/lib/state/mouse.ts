import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

type MouseState = App.State.Mouse;

const createMouseStore = (): App.State.MouseStore => {
	const { subscribe, set, update } = writable<MouseState>({ pos: { x: 0, y: 0 } });

	return {
		subscribe,
		set,
		update,
		updatePos: (e: MouseEvent) => {
			update((state) => {
				state.pos.x = e.clientX;
				state.pos.y = e.clientY;
				return state;
			});
		}
	};
};

const MOUSE = 'MOUSE';

export function setMouseState() {
	const mouseState = createMouseStore();
	setContext(MOUSE, mouseState);
	return mouseState;
}

export function getMouseState() {
	return getContext<App.State.MouseStore>(MOUSE);
}
