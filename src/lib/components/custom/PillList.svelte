<script lang="ts">
	export let props: Grid.CustomComponents.PillListProps;

	$: title = props.title;
	$: list = props.list;
</script>

<div class="flex flex-col gap-3 max-w-[300px] min-w-0 break-words text-left">
	{#if title}
		<p class="font-semibold">{title}</p>
	{/if}
	<div class="flex gap-1 flex-wrap">
		{#each list as item}
			<p class="text-left px-2 py-1 border border-border-light rounded-full !w-fit truncate">
				{item}
			</p>
		{/each}
	</div>
</div>
