<script lang="ts">
	import { getRowActionsState } from '$components/grid/state/rowActions';
	import PopoverCard from '$components/misc/popups/PopoverCard.svelte';
	import { IconDotsVertical, IconExternalLink } from '@tabler/icons-svelte';
	import { addToast } from '$components/misc/popups/Toaster.svelte';

	const ctx = getRowActionsState();
	const visibility = $ctx.visibility;
	const grid = $ctx.props.context.grid as Grid.Store;
	const actions = $grid.props.actions?.custom!;

	function handleAction(action: Grid.CustomAction) {
		if (action.url) {
			window.open(action.url, '_blank');
		} else {
			addToast({
				data: {
					title: 'Success',
					description: 'Custom action clicked: ' + action.displayName,
					color: 'green'
				}
			});
		}
		$visibility.customActions = false;
	}
</script>

<PopoverCard bind:open={$visibility.customActions}>
	<button slot="trigger" class="action-btn" tabindex={-1}>
		<IconDotsVertical size="1rem" />
	</button>
	<div slot="content" class="flex flex-col w-44">
		{#each actions as action}
			<button
				class="popover-btn justify-between flex-nowrap gap-2"
				on:click={() => handleAction(action)}
			>
				<p class="font-normal truncate pointer-events-none text-text-primary">
					{action.displayName.trim()}
				</p>
				{#if action.url}
					<div class="pointer-events-none w-fit min-w-fit">
						<IconExternalLink size="1rem" />
					</div>
				{/if}
			</button>
		{/each}
	</div>
</PopoverCard>
