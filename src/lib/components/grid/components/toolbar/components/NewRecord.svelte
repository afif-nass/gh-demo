<script lang="ts">
	import { createRows } from '$components/grid/operations/mutations/createRows';
	import { IconPlus } from '@tabler/icons-svelte';
	import { getGridState } from '$components/grid/state/grid';

	const grid = getGridState();
</script>

{#if $grid.props?.actions?.createRecords?.single}
	<button class="action-btn" on:click={() => createRows(grid)}>
		<IconPlus size={'1.1em'} />
		New
	</button>
{/if}
