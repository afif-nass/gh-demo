<script lang="ts">
	import { get } from 'svelte/store';

	export let grid: Grid.Store;

	let gridState = get(grid);

	let component = gridState.props?.aboveGridComponent?.self;
	let props = gridState.props?.aboveGridComponent?.props;
</script>

<svelte:component this={component} {...props} />
