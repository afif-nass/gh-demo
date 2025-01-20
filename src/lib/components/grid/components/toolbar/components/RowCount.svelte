<script lang="ts">
	import { getGridState } from '$components/grid/state/grid';
	import { fade } from 'svelte/transition';

	const grid = getGridState();

	function format(val: number) {
		if (!val) return 0;
		return val.toLocaleString();
	}

	$: selected = format($grid.rowCounts.selected);
	$: displayed = format($grid.rowCounts.displayed);
	$: total = format($grid.rowCounts.total);
</script>

<div class="flex flex-wrap gap-4">
	{#if selected}
		<p class="text-text-secondary text-left text-sm w-fit">
			Selected {selected} of {total} rows
		</p>
	{/if}
	<p class="text-text-secondary text-left text-sm">
		Showing {displayed} of {total} rows
	</p>
</div>
