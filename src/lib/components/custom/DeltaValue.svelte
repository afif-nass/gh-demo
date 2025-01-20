<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import { currency } from '$components/grid/helpers/formatters/currency';
	import { number } from '$components/grid/helpers/formatters/number';
	import { percent } from '$components/grid/helpers/formatters/percent';
	import { twConfig } from '$src/theme';
	import { BarLoader } from 'svelte-loading-spinners';
	import { IconArrowUp, IconArrowDown } from '@tabler/icons-svelte';

	export let props: Grid.CustomComponents.DeltaProps;

	$: currentValue = Number(props.value) ?? null;

	let prevValue: number | undefined;
	let currentDelta: Delta | undefined = undefined;
	let displayDelta: Delta | undefined = undefined;
	let textColor = '';
	let bgColor = '';

	type Delta = '=' | '+' | '-';

	$: loading = isNaN(currentValue);

	const tweenedValue = tweened(0, {
		duration: 800,
		easing: cubicInOut
	});

	const colors = twConfig.theme.colors;

	$: if (!loading && currentValue) {
		setState();
	}

	const textColors: Record<Delta, string> = {
		'=': colors.text.primary,
		'+': colors.affirmative.primary,
		'-': colors.destructive.primary
	};

	const bgColors: Record<Delta, string> = {
		'=': '',
		'+': colors.affirmative.light,
		'-': colors.destructive.light
	};

	async function setColor() {
		if (!currentDelta) return;
		bgColor = bgColors[currentDelta];
		textColor = textColors[currentDelta];
		setTimeout(() => {
			bgColor = '';
		}, 800);
	}

	async function setState() {
		currentDelta = compare();
		if (currentDelta !== '=') {
			tweenedValue.set(currentValue);
			await setColor();
		}
		prevValue = currentValue;
	}

	function compare(): Delta | undefined {
		if (prevValue === undefined) return undefined;
		const currentRounded = Number(currentValue.toFixed(2));
		const prevRounded = Number(prevValue!.toFixed(2));
		const difference = currentRounded - prevRounded;
		const absDifference = Math.abs(difference);
		if (absDifference >= 0.01) {
			const diff = difference > 0 ? '+' : '-';
			displayDelta = diff;
			return diff;
		} else {
			return '=';
		}
	}

	function format(val: number) {
		const formatMethod = props.format ?? null;
		switch (formatMethod) {
			case 'currency':
				return currency(val);
			case 'percent':
				return percent(val, true, 3);
			default:
				return number(val);
		}
	}
</script>

{#if loading}
	<BarLoader duration={'0.65s'} color={twConfig.theme.colors.brand.primary} />
{:else}
	<div
		class="flex gap-1 items-center transition-all duration-500 w-[120px] py-2 px-4 rounded mr-6"
		style="color: {textColor}; background-color: {bgColor}"
	>
		{#if displayDelta === '+'}
			<div in:fade={{ delay: 0, duration: 300 }}>
				<IconArrowUp size="1.2rem" />
			</div>
		{:else if displayDelta === '-'}
			<div in:fade={{ delay: 0, duration: 300 }}>
				<IconArrowDown size="1.2rem" />
			</div>
		{/if}
		<p class="tabular-nums font-medium" style="color: {textColor};">
			{format($tweenedValue)}
		</p>
	</div>
{/if}
