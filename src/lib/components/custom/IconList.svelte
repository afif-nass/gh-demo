<script lang="ts">
	import Doughnut from '$lib/components/custom/Doughnut.svelte';

	export let props: Grid.CustomComponents.IconListProps;

	$: iconList = props.iconList;
</script>

<div class="flex gap-6 items-center min-w-fit">
	<div class="flex flex-col gap-1">
		{#each iconList as item}
			<div
				class="flex justify-between items-center p-2 gap-12 pr-3 card-border rounded-sm w-[180px]"
			>
				<div class="flex gap-1 items-center" style="color: {item.color};">
					<svelte:component
						this={item.icon.component}
						{...item.icon.props}
						{...{ stroke: '2px', color: item.color }}
					/>
					<p
						class="font-semibold uppercase text-[10px] max-w-[85%] truncate"
						style="color: {item.color}"
					>
						{item.label ?? ''}
					</p>
				</div>
				<p>{item.value ?? ''}</p>
			</div>
		{/each}
	</div>
	{#if iconList.filter((item) => Number(item.value) !== 0).length > 0}
		<Doughnut data={iconList} />
	{/if}
</div>
