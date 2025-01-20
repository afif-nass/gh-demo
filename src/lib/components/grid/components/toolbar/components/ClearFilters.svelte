<script lang="ts">
	import { IconFilterCancel } from '@tabler/icons-svelte';
	import { getGridState } from '$components/grid/state/grid';

	const grid = getGridState();

	function clearFilters() {
		$grid.api?.setFilterModel(null);
		$grid.rowCounts.displayed = $grid.rowCounts.total;
	}
</script>

{#if $grid.api?.getFilterModel() && Object.keys($grid.api?.getFilterModel()).length}
	{#if $grid.rowCounts.displayed != $grid.rowCounts.total}
		<button class="action-btn" on:click={clearFilters}>
			<IconFilterCancel size="1rem" />
			Clear filters
		</button>
	{/if}
{/if}
