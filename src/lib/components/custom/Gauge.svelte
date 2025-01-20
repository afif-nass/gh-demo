<script lang="ts">
	import { twConfig } from '$src/theme';

	export let props: Grid.CustomComponents.GaugeProps;

	$: min = props.min ?? 0;
	$: max = props.max ?? 100;
	$: value = props.value ?? 75;
	$: palette = props.palette || 'bad-good';
	$: angle = normalizeValue(value, min, max, -90, 90);

	const colors = twConfig.theme.colors;
	const segments = 3;
	const strokeWidth = 30;
	const palettes: Record<Grid.CustomComponents.GaugeProps['palette'], string[]> = {
		'bad-good': [colors.destructive.primary, colors.warning.primary, colors.affirmative.primary],
		bad: [colors.destructive.primary],
		good: [colors.affirmative.primary],
		'bad-good-bad': [
			colors.destructive.primary,
			colors.affirmative.primary,
			colors.destructive.primary
		]
	};
	const segmentAngle = 180 / segments;
	const startAngle = -90;
	const needleColor = colors.text.primary;

	function polarToCartesian(
		centerX: number,
		centerY: number,
		radius: number,
		angleInDegrees: number
	) {
		let angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
		return {
			x: centerX + radius * Math.cos(angleInRadians),
			y: centerY + radius * Math.sin(angleInRadians)
		};
	}

	function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
		let start = polarToCartesian(x, y, radius, endAngle);
		let end = polarToCartesian(x, y, radius, startAngle);

		let largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

		let d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(
			' '
		);

		return d;
	}

	function normalizeValue(
		value: number,
		min: number,
		max: number,
		newMin: number,
		newMax: number
	): number {
		if (min === max) {
			return newMin;
		}
		return ((Math.max(min, Math.min(value, max)) - min) / (max - min)) * (newMax - newMin) + newMin;
	}
</script>

<div class="grid grid-cols-1 items-end w-[100px]">
	<svg class="row-start-1 col-start-1 justify-self-center" viewBox="0 0 200 100">
		{#each Array(segments) as _, i}
			<path
				d={describeArc(
					100,
					100,
					80,
					startAngle + segmentAngle * i,
					startAngle + segmentAngle * (i + 1)
				)}
				stroke={palettes[palette][i]}
				stroke-width={strokeWidth}
				fill="none"
			/>
		{/each}
	</svg>
	<svg
		class="row-start-1 col-start-1 w-[10%] justify-self-center"
		style="transform: rotate({angle}deg); transform-origin: 50% 100%"
		viewBox="0 0 23 94"
		preserveAspectRatio="xMidYMid meet"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="11.5" cy="82.5" r="11.5" fill={colors.slate[300]} />
		<path
			d="M9.4112 2.63181C9.46087 1.51427 10.3814 0.633789 11.5 0.633789V0.633789C12.6186 0.633789 13.5391 1.51427 13.5888 2.63182L17.2336 84.6397C17.3788 87.9062 14.7697 90.6338 11.5 90.6338V90.6338C8.23028 90.6338 5.62123 87.9062 5.7664 84.6397L9.4112 2.63181Z"
			fill={needleColor}
		/>
		<circle cx="11.5" cy="82.5" r="2.5" fill="white" />
	</svg>
	<p class="justify-self-center mt-2">
		{value}%
	</p>
</div>
