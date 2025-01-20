<script lang="ts">
	import PopoverCard from '$components/misc/popups/PopoverCard.svelte';
	import { IconDownload } from '@tabler/icons-svelte';
	import { getGridState } from '$components/grid/state/grid';

	const grid = getGridState();

	let open = false;

	function download(onlySelected: boolean) {
		$grid.api?.exportDataAsCsv({ exportedRows: 'filteredAndSorted', onlySelected });
		open = false;
	}

	const popoverBtnStyle =
		'flex !min-w-0 flex-wrap w-full max-w-full items-center text-left hover:bg-muted gap-1 p-2 font-medium rounded text-text-secondary text-sm transition-colors duration-200 ease-in-out ';
</script>

{#if $grid.props?.actions?.download}
	<PopoverCard bind:open>
		<button class="action-btn" slot="trigger" tabindex={-1}>
			<IconDownload size="1rem" />
			Download
		</button>
		<span slot="content" class="min-w-32 max-w-48">
			{#each ['All rows', 'Selected rows'] as option}
				{#if !(option === 'Selected rows' && !$grid.rowCounts.selected)}
					<button
						class={`${popoverBtnStyle} justify-between flex-nowrap gap-2`}
						on:click={() => download(option === 'Selected rows')}
					>
						<p class="font-medium text-text-secondary truncate pointer-events-none">
							{option}
						</p>
					</button>
				{/if}
			{/each}
		</span>
	</PopoverCard>
{/if}
