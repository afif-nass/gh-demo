<script lang="ts">
	import { deleteRows } from '$components/grid/operations/mutations/deleteRows';
	import { IconTrash } from '@tabler/icons-svelte';
	import { getGridState } from '$components/grid/state/grid';
	import { fade } from 'svelte/transition';
	import { twConfig } from '$src/theme';

	const grid = getGridState();
</script>

{#if $grid.props?.actions?.deleteRecords && $grid.rowCounts.selected}
	<button
		in:fade={{ delay: 0, duration: 300 }}
		class="action-btn !text-destructive-primary"
		on:click={() => deleteRows(grid)}
	>
		<IconTrash size="1rem" color={twConfig.theme.colors.destructive.primary} />
		Delete
	</button>
{/if}
