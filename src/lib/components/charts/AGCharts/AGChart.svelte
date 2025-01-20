<script lang="ts">
	import * as AG from 'ag-charts-community';
	import { onMount, onDestroy } from 'svelte';

	export let chartProps: {
		config?: {};
		options: AG.AgChartOptions;
	};

	let div: HTMLElement;
	let chart: AG.AgChartInstance;

	$: if (div && chartProps.options) {
		if (chart) {
			chart.destroy();
		}
		chartProps.options.container = div;
		chart = AG.AgCharts.create(chartProps.options);
	}

	onMount(() => {
		if (chartProps.options) {
			chartProps.options.container = div;
			chart = AG.AgCharts.create(chartProps.options);
		}
	});

	onDestroy(() => {
		if (chart) {
			chart.destroy();
		}
	});
</script>

<div class="w-96 h-96" bind:this={div} />
