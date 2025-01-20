<script lang="ts">
	import { setGridState } from '$components/grid/state/grid';
	import { setCellHoverCardState } from '$components/grid/state/cellHoverCard';
	import { shortcut } from '$src/lib/helpers/app/shortcut';
	import { createGrid } from 'ag-grid-community';
	import { onDestroy, onMount } from 'svelte';
	import { createGridStore } from './AGManager/defaultGridState';
	import { updateGridOptions } from './AGManager/updateGridOptions';
	import AboveGrid from './components/AboveGrid.svelte';
	import ExternalFilters from './components/ExternalFilters.svelte';
	import Modal from './components/Modal.svelte';
	import Toolbar from './components/toolbar/Toolbar.svelte';
	import { shortcuts } from './helpers/keyboard/shortcuts';
	import './styles/main.css';
	import { runOnMountFuncs } from './helpers/onMount/runOnMountFuncs';
	import { getDrawerState } from '$src/lib/state/drawer';

	export let gridProps: Grid.Props;
	export let mouse: App.State.MouseStore;

	const cellHoverCard = setCellHoverCardState({ rendered: false });
	const drawer = getDrawerState();

	let grid: Grid.Store = createGridStore(gridProps);
	let div: HTMLElement;

	$: leftOffset = $mouse.pos!.x + 10;
	$: topOffset = $mouse.pos!.y + 20;

	setGridState(grid);

	onMount(async () => {
		await updateGridOptions(grid, cellHoverCard, drawer);
		$grid.api = createGrid(div, Object.assign({}, $grid?.props.options));
		await runOnMountFuncs(grid);
	});

	onDestroy(() => {
		$grid?.props?.externalFilters?.class?.destroy();
		$grid?.props?.destroyFuncs?.forEach((item) => item());
	});
</script>

{#if $grid?.modal.visible}
	<Modal />
{/if}

{#if !$grid.revealed}
	<div class="flex w-full flex-col gap-2">
		{#each Array(10) as _}
			<div class="w-full rounded h-[100px] animate-pulse bg-slate-100" />
		{/each}
	</div>
{/if}

<div class="w-full flex flex-col gap-3 {$grid.revealed ? '' : 'opacity-0 pointer-events-none h-0'}">
	{#if $grid.revealed}
		{#if $grid?.props?.aboveGridComponent}
			<div class="my-4">
				<AboveGrid {grid} />
			</div>
		{/if}
		{#if $grid?.props?.externalFilters}
			<ExternalFilters />
		{/if}
		<Toolbar />
	{/if}
	<div
		class="h-[92vh] ag-theme-quartz rounded shadow relative overflow-hidden"
		id="grid"
		role="table"
		bind:this={div}
		use:shortcut={shortcuts(grid)}
	>
		{#if $cellHoverCard.rendered}
			<div
				class="z-50 fixed bg-background flex w-fit !min-w-0 p-3 items-center popup-border min-h-[20px]"
				style="left: {leftOffset}px; top: {topOffset}px"
			>
				<svelte:component this={$cellHoverCard?.component} props={$cellHoverCard?.props} />
			</div>
		{/if}
	</div>
</div>
