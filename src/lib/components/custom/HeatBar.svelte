<script lang="ts">
	import { twConfig } from '$src/theme';

	export let props: Grid.CustomComponents.HeatBarProps;

	$: value = props.value || 0;

	const colors = twConfig.theme.colors;
	const barHeight = 'h-[12px]';

	let markerWidth = 0;
	let adjustedMarkerWidth = 0;

	$: color = getColor(value);
	$: percent = Math.min(Math.max(value * 100, 80), 120);
	$: scaledPercent = ((percent - 80) / 40) * 100;
	$: displayPercent = Number(value).toLocaleString(undefined, {
		style: 'percent',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
	$: {
		if (percent < 83) {
			adjustedMarkerWidth = 0;
		} else if (percent > 117) {
			adjustedMarkerWidth = markerWidth;
		} else {
			adjustedMarkerWidth = markerWidth / 2;
		}
	}

	function getColor(value: number) {
		if (value < 0.9 || value > 1.1) {
			return colors.destructive.primary;
		} else if ((value >= 0.9 && value < 0.95) || (value > 1.05 && value <= 1.1)) {
			return colors.warning.primary;
		} else if (value >= 0.95 && value <= 1.05) {
			return colors.affirmative.primary;
		}
	}
</script>

<div class="flex flex-col w-[250px]">
	<div
		class="flex flex-col items-center w-fit"
		style="margin-left: calc({scaledPercent}% - {adjustedMarkerWidth}px);"
	>
		<p
			bind:offsetWidth={markerWidth}
			class="w-fit text-nowrap text-xs rounded-sm pl-[5px] pr-[4px] text-white py-[1px]"
			style="background-color: {color}"
		>
			{displayPercent}
		</p>
		<div class="w-fit">
			<svg width="10" height="4" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M13 0C13.852 0 14.297 0.986 13.783 1.623L13.707 1.707L7.70695 7.707C7.53476 7.87918 7.30566 7.98261 7.06263 7.99789C6.81961 8.01317 6.57936 7.93925 6.38695 7.79L6.29295 7.707L0.292953 1.707L0.209953 1.613L0.155953 1.536L0.101954 1.44L0.0849533 1.404L0.0579534 1.337L0.0259533 1.229L0.0159531 1.176L0.00595331 1.116L0.00195312 1.059V0.941L0.00695324 0.883L0.0159531 0.823L0.0259533 0.771L0.0579534 0.663L0.0849533 0.596L0.154953 0.464L0.219953 0.374L0.292953 0.293L0.386953 0.21L0.463953 0.156L0.559953 0.102L0.595953 0.085L0.662953 0.0579996L0.770953 0.026L0.823953 0.0159998L0.883953 0.00599957L0.940953 0.00199986L13 0Z"
					fill={color}
				/>
			</svg>
		</div>
	</div>
	<div class="{barHeight} rounded-full w-full bg-gradient-to-r value row-start-1 col-start-1" />
</div>

<style>
	.value {
		background: linear-gradient(
			to right,
			#ff6a6a 0%,
			#ffdea2 28%,
			#00c584 50%,
			#ffdea2 72%,
			#ff6a6a 100%
		);
	}
</style>
