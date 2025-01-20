<script lang="ts">
	import { getRowActionsState } from '$components/grid/state/rowActions';
	import { twConfig } from '$src/theme';
	import { IconTrash } from '@tabler/icons-svelte';
	import { deleteRows } from '$components/grid/operations/mutations/deleteRows';

	const ctx = getRowActionsState();
	const grid = $ctx.props.context.grid as Grid.Store;
</script>

<button class="action-btn !text-destructive-primary" on:click={() => deleteRows(grid, false)}>
	<IconTrash
		size="1rem"
		class="pointer-events-none"
		color={twConfig.theme.colors.destructive.primary}
	/>
</button>
