<script lang="ts">
	import Grid from '$lib/components/grid/Grid.svelte';
	import { getMouseState } from '$src/lib/state/mouse';
	import gridProps from './props';

	export let data: any;

	const mouseState = getMouseState();
</script>

<Grid mouse={mouseState} gridProps={Object.assign({}, gridProps)} />
