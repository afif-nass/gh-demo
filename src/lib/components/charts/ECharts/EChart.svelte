<script lang="ts">
	import * as echarts from 'echarts';
	import { onMount, onDestroy } from 'svelte';

	export let option: echarts.EChartsCoreOption;

	let div: HTMLDivElement;
	let chart: echarts.ECharts;

	onMount(() => {
		chart = echarts.init(div);
		chart.setOption(option);
	});

	onDestroy(() => {
		chart.dispose();
	});
</script>

{#key option}
	<div class="w-full h-full" bind:this={div} />
{/key}
