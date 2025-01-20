<script lang="ts">
	import { copyRow } from '$components/grid/operations/misc/copyRow';
	import { getRowActionsState } from '$components/grid/state/rowActions';
	import PopoverCard from '$components/misc/popups/PopoverCard.svelte';
	import { IconBraces, IconCopy, IconList, IconTable } from '@tabler/icons-svelte';

	const ctx = getRowActionsState();
	const grid = $ctx.props.context.grid as Grid.Store;
	const visibility = $ctx.visibility;

	function copy(format: string) {
		copyRow(format, grid, $ctx.props);
		$visibility.copyOptions = false;
	}
</script>

<PopoverCard bind:open={$visibility.copyOptions}>
	<button slot="trigger" class="action-btn" tabindex={-1}>
		<IconCopy size="1rem" />
	</button>
	<div slot="content" class="*:flex-nowrap *:popover-btn">
		<button on:click={() => copy('list')}>
			<IconList size="1rem" /> List
		</button>
		<button on:click={() => copy('json')}>
			<IconBraces size="1rem" /> JSON
		</button>
		<button on:click={() => copy('tsv')}>
			<IconTable size="1rem" /> TSV
		</button>
	</div>
</PopoverCard>
