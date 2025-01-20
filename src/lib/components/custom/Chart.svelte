<script lang="ts">
	import EChart from '$components/charts/ECharts/EChart.svelte';
	import * as echarts from 'echarts';

	export let props: any;

	$: data = props.data;
	// $: params = props.data;

	// async function findOption(chartType: string) {
	// 	const targetOption: echarts.EChartsOption = await (async () => {
	// 		const module = await import(`$lib/components/charts/ECharts/chartOptions/${chartType}.ts`);
	// 		const getOption = module.default;
	// 		const option = getOption(params, data);
	// 		return option;
	// 	})();
	// 	return targetOption;
	// }
</script>

<!-- {#key params}
	{#await findOption(params.chartType)}
		<span />
	{:then returnedOption}
		<div class="absolute top-0 left-0 right-0 bottom-0 w-full h-full">
			<EChart option={returnedOption} />
		</div>
	{/await}
{/key} -->
