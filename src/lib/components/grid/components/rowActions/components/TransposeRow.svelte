<script lang="ts">
	import { getRowActionsState } from '$components/grid/state/rowActions';
	import { IconArrowsMaximize } from '@tabler/icons-svelte';
	import { getCells } from '../getRowCells';

	const ctx = getRowActionsState();
	const grid = $ctx.props.context.grid as Grid.Store;

	function transpose() {
		if ($grid.modal.visible) {
			grid.update((state) => {
				state.modal.visible = false;
				return state;
			});
		} else {
			grid.update((state) => ({
				...state,
				modal: {
					...state.modal,
					visible: true,
					title: 'Viewing row',
					fields: [],
					cells: getCells($ctx)
				}
			}));
		}
	}
</script>

<button class="action-btn" on:click={transpose}>
	<IconArrowsMaximize size="1rem" />
</button>
