<script lang="ts">
	import Grid from '$lib/components/grid/Grid.svelte';
	import type { PageData } from './$types';
	import { getTitleState } from '$src/lib/state/pageTitle';
	import { getMouseState } from '$src/lib/state/mouse';

	export let data: PageData;

	const mouseState = getMouseState();
	const titleState = getTitleState();

	$: gridDef = data.gridDef;
	$: gridProps = Object.assign({}, data.gridProps);
	$: title = gridDef?.title;
	$: {
		$titleState.hidden = gridDef.hideTitle;
	}
	$: if (title) {
		$titleState.title = 'Demo — ' + title;
	}
</script>

{#if gridDef.description}
	<p class="max-w-prose">{gridDef.description}</p>
{/if}
{#if 'customDashboardComponent' in gridProps}
	<svelte:component this={gridProps.customDashboardComponent} {...gridProps} />
{:else}
	<Grid mouse={mouseState} {gridProps} />
{/if}
