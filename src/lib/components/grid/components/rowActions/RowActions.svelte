<script lang="ts">
	import * as AG from 'ag-grid-community';
	import CopyRow from './components/CopyRow.svelte';
	import DeleteRow from './components/DeleteRow.svelte';
	import TransposeRow from './components/TransposeRow.svelte';
	import EditRow from './components/EditRow.svelte';
	import OpenDrawer from './components/OpenDrawer.svelte';
	import CustomActions from './components/CustomActions.svelte';
	import { setRowActionsState } from '$components/grid/state/rowActions';
	import { writable } from 'svelte/store';

	export let props: AG.ICellRendererParams;

	const grid = props.context.grid as Grid.Store;
	const actions = $grid.props.actions!;

	setRowActionsState({
		props,
		visibility: writable({ customActions: false, copyOptions: false, drawer: false })
	});

	const components = [
		{ component: TransposeRow, action: 'maximize', tip: 'View as column' },
		{ component: CopyRow, action: 'copyRow', tip: 'Copy row' },
		{ component: EditRow, action: 'updateRecord', tip: 'Edit row' },
		{ component: DeleteRow, action: 'deleteRecords.single', tip: 'Delete row' },
		{ component: OpenDrawer, action: 'rowInfo', tip: 'View row details' },
		{ component: CustomActions, action: 'custom.length', tip: 'Custom actions' }
	];

	function checkNestedProperty(obj: any, path: string): boolean {
		return path.split('.').reduce((acc, part) => acc && acc[part], obj) !== undefined;
	}
</script>

<div class="flex gap-3 h-fit w-fit items-center *:min-w-fit">
	{#each components as { component, action, tip }}
		{#if checkNestedProperty(actions, action)}
			<svelte:component this={component} />
		{/if}
	{/each}
</div>
