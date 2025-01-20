<script lang="ts">
	import { twConfig } from '$src/theme';
	import * as datefns from 'date-fns';
	import { formatDate } from '$lib/helpers/formatters/dates';
	import { onMount } from 'svelte';

	export let props: Grid.CustomComponents.FlightProgressProps;

	$: value = props.value;
	$: dates = { start: props.dates.start, end: props.dates.end };
	$: percent = value * 100;
	$: solidColor = getColor(percent, true);
	$: gradient = getColor(percent, false);

	let plane: HTMLElement;
	let planeParentWidth: number;
	let progressBar: HTMLElement;
	let text: HTMLElement;
	let planeWidth = 0;
	let mounted = false;

	const colors = twConfig.theme.colors;

	function getColor(percent: number, solidColor: boolean) {
		if (percent === 100) {
			return solidColor ? colors.border.primary : 'from-border-light to-border-primary/50';
		} else if (percent < 70) {
			return solidColor ? colors.affirmative.primary : 'from-emerald-50 to-emerald-500/50';
		} else if (percent >= 70 && percent < 90) {
			return solidColor ? colors.warning.primary : 'from-amber-50 to-amber-500/50';
		} else {
			return solidColor ? colors.destructive.primary : 'from-red-50 to-red-500/50';
		}
	}

	function getTotalDays() {
		return datefns.differenceInCalendarDays(new Date(dates.end), new Date(dates.start)) + 1;
	}

	function displayString() {
		const start = new Date(dates.start);
		const end = new Date(dates.end);
		const totalDuration = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
		return `Day ${Math.round(totalDuration * value) + 1} of ${getTotalDays()}`;
	}

	async function animate() {
		const percentageValue = value * planeParentWidth;
		const finalValue = Math.max(0, percentageValue - planeWidth) + 'px';
		plane.style.marginLeft = finalValue;
		const textParentWidth = text.parentElement?.clientWidth || 0;
		text.innerText = displayString();
		text.style.marginLeft = Math.max(0, value * textParentWidth - text.offsetWidth) + 'px';
		progressBar.style.width = finalValue;
	}

	$: if (mounted && planeParentWidth) {
		animate();
	}

	onMount(() => {
		animate();
		mounted = true;
	});
</script>

<div class="w-[250px] grid gap-1">
	<!-- Display text -->
	<p
		class="text-xs w-fit font-medium tabular-nums ml-0 text-nowrap text"
		bind:this={text}
		style="color: {solidColor}"
	/>
	<div bind:clientWidth={planeParentWidth} class="grid grid-cols-1 w-full items-center">
		<!-- Background bar -->
		<div
			style="background-color: {solidColor}20;"
			class="rounded-full w-full row-start-1 col-start-1 h-[7px]"
		/>
		<!-- Progress bar -->
		<div
			bind:this={progressBar}
			style="background-color: {solidColor}20;"
			class="{gradient} bg-gradient-to-r rounded-full row-start-1 col-start-1 w-0 progress h-[7px]"
		/>
		<!-- Plane -->
		<div
			class="row-start-1 col-start-1 min-h-fit min-w-fit w-6 h-6 plane ml-0"
			bind:offsetWidth={planeWidth}
			bind:this={plane}
		>
			<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M18 8H12.9L6.2 0H4L8 8H3L1.3 6H0L1 10L0 14H1.3L3 12H8L4 20H6.2L12.9 12H18C19.1 12 20 11.1 20 10C20 8.9 19.1 8 18 8Z"
					fill={solidColor}
				/>
			</svg>
		</div>
	</div>
	<!-- Dates -->
	<div class="flex justify-between items-center w-full">
		{#each [dates.start, dates.end] as date}
			<p class="text-xs uppercase text-text-secondary font-light">
				{formatDate(date, 'friendly-no-time')}
			</p>
		{/each}
	</div>
</div>

<style>
	.plane,
	.text {
		transition: margin-left 3s;
	}
	.progress {
		transition: width 3s;
	}
</style>
