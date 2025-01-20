<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	export let num = 0;
	export let classes = '';

	const tweenedValue = tweened(num, {
		duration: 1500,
		easing: cubicInOut
	});

	function number(num: Number) {
		return num.toLocaleString('en-US', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		});
	}

	onMount(() => {
		setInterval(() => {
			num += 100;
			tweenedValue.set(num);
		}, 1800);
	});
</script>

<h1
	class="font-sf-pro-rounded-medium text-gradient-base from-purple-50 to-purple-400 font-semibold text-6xl tabular-nums py-1 tracking-tight {classes}"
>
	{number($tweenedValue)}
</h1>
