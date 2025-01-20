<script lang="ts">
	export let props: Grid.CustomComponents.ProgressBarProps;

	$: barColor = props.barColor;
	$: min = props.minLabel;
	$: percent = props.percent;
	$: target = props.targetLabel;
</script>

<div class="flex flex-col items-center gap-1 w-[180px]">
	<div class="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
		<div class="h-full rounded-full bg-gradient-to-r {barColor}" style="width: {percent}%;" />
	</div>
	<div class="flex justify-between items-center w-full">
		{#each [min, target] as val}
			<p class="text-xs uppercase text-text-secondary font-light">
				{val}
			</p>
		{/each}
	</div>
</div>
