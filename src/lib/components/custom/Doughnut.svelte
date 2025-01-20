<script lang="ts">
	import { scaleOrdinal } from 'd3-scale';
	import { Pie, Chart, Svg } from 'layerchart';

	export let data: DataItem[];

	$: colorKeys = data.map((d) => d.label);
	$: keyColors = data.map((d) => d.color);

	type DataItem = {
		color: string;
		value: string;
		label?: string;
	};
</script>

<div class="w-[100px] h-[100px]">
	<Chart {data} x="value" r="label" rScale={scaleOrdinal()} rDomain={colorKeys} rRange={keyColors}>
		<Svg>
			<Pie
				innerRadius={40}
				cornerRadius={100}
				padAngle={data.filter((item) => Number(item.value) !== 0).length === 1 ? 0 : 0.05}
			/>
		</Svg>
	</Chart>
</div>
