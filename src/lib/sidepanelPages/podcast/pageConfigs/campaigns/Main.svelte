<script lang="ts">
	import Tabs from '$components/misc/Tabs.svelte';
	import Grid from '$components/grid/Grid.svelte';
	import { getMouseState } from '$src/lib/state/mouse';
	import { page } from '$app/stores';
	import gridProps from './grid/props';

	export let data: any;

	const urlParamName = 'view';
	const views = [{ label: 'All' }, { label: 'Unapproved' }];

	$: view = $page.url.searchParams.get(urlParamName) ?? views[0].label;
</script>

<div class="flex flex-col gap-3 w-full">
	{#if views}
		<Tabs tabItems={views} activeTabValue={view} {urlParamName} />
	{/if}
	<Grid mouse={getMouseState()} gridProps={Object.assign({}, gridProps)} />
</div>
