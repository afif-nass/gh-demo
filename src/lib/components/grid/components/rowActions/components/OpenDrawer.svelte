<script lang="ts">
	import { getRowActionsState } from '$components/grid/state/rowActions';
	import { IconEyeFilled, IconChevronDown } from '@tabler/icons-svelte';
	import { fade } from 'svelte/transition';

	const ctx = getRowActionsState();
	const visibility = $ctx.visibility;
	const grid = $ctx.props.context.grid as Grid.Store;
	const drawer = $ctx.props.context.drawer;
	const row = $ctx.props.node;
	const rowInfo = $grid.props.actions?.rowInfo;

	$: if (!$drawer.visible) {
		$visibility.drawer = false;
	}

	function handleClick() {
		if (!rowInfo) return;
		$ctx.props.api?.flashCells({ rowNodes: [row], flashDuration: 300 });
		$visibility.drawer = true;
		drawer.set({
			visible: true,
			component: {
				self: rowInfo.component,
				props: { actionsContext: ctx }
			}
		});
	}
</script>

<button class="action-btn" on:click={handleClick}>
	{#if !$visibility.drawer}
		<IconChevronDown size="1rem" class="pointer-events-none" />
	{:else}
		<div in:fade={{ duration: 300 }} class="flex items-center justify-center text-brand-primary">
			<IconEyeFilled size="1rem" class="pointer-events-none" />
		</div>
	{/if}
</button>
