<!-- <script lang="ts">
	import { geoOrthographic } from 'd3-geo';
	import { Chart, GeoEdgeFade, GeoPath, GeoPoint, GeoSpline, Graticule, Svg } from 'layerchart';
	import { data } from './data';
	import { feature } from 'topojson-client';

	const countries = feature(data.geojson, data.geojson.objects.countries);
</script>

<div class="h-[600px] overflow-hidden">
	<Chart
		geo={{
			projection: geoOrthographic,
			fitGeojson: countries,
			applyTransform: ['rotate']
		}}
		padding={{ top: 80, bottom: 80 }}
	>
		<Svg>
			<GeoPath geojson={{ type: 'Sphere' }} class="fill-blue-400/50" />
			<Graticule class="stroke-surface-content/20 pointer-events-none" />
			{#each countries.features as country}
				<GeoPath
					geojson={country}
					class="stroke-surface-content/50 fill-white pointer-events-none"
				/>
			{/each}
			{#each mapData.worldLinks as link}
				<GeoEdgeFade {link}>
					<GeoPoint lat={link.source[1]} long={link.source[0]} r={2} class="fill-black" />
					<GeoPoint lat={link.target[1]} long={link.target[0]} r={2} class="fill-black" />
					<GeoSpline {link} class="stroke-gray-500/30 stroke-2" />
					<GeoSpline {link} class="stroke-danger stroke-2" loft={1.3} />
				</GeoEdgeFade>
			{/each}
		</Svg>
	</Chart>
</div> -->
