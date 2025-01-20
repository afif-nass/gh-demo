<script lang="ts">
	export let props: Grid.CustomComponents.MetricCardsProps;

	$: cards = props.cards;
</script>

<div class="grid grid-cols-2 gap-1 min-w-[300px]">
	{#each cards as card}
		<div class="flex min-w-[150px] flex-col gap-2 card-border p-3">
			<p class="text-left text-[0.65rem] w-fit truncate uppercase text-text-secondary font-medium">
				{card.label}
			</p>
			<p class="text-left w-fit truncate text-sm font-semibold">
				{card.value}
			</p>
		</div>
	{/each}
</div>
