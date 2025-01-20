<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import createGlobe from 'cobe';

	export let size = 600;
	export let hex = '0047AB';

	type Marker = { location: [number, number]; size: number };
	type FlashMarker = {
		location: [number, number];
		startTime: number;
		duration: number;
	};

	let canvas: HTMLCanvasElement;
	let phi = 0;
	let rgb: [number, number, number] = hexToRgb(hex);
	let markers: Marker[] = [];
	let flashMarkers: FlashMarker[] = [];
	let intervalId: any;

	function hexToRgb(hex: string): [number, number, number] {
		hex = hex.replace(/^#/, '');
		let bigint = parseInt(hex, 16);
		let r = (bigint >> 16) & 255;
		let g = (bigint >> 8) & 255;
		let b = bigint & 255;
		return [r / 100, g / 100, b / 100];
	}

	function addMarker(location: Marker['location']) {
		markers.push({ location, size: 0.06 });
		flashMarkers.push({
			location,
			startTime: performance.now(),
			duration: 2000
		});
	}

	function startAddingMarkers() {
		const locations: [number, number][] = [
			[37.7595, -122.4367], // San Francisco
			[40.7128, -74.006] // New York
		];
		let index = 0;
		intervalId = setInterval(() => {
			addMarker(locations[index]);
			index = (index + 1) % locations.length;
		}, 5000);
	}

	onMount(() => {
		createGlobe(canvas, {
			devicePixelRatio: 2,
			width: size * 2,
			height: size * 2,
			phi: 0,
			theta: 0,
			dark: 1,
			diffuse: 2,
			mapSamples: 15000,
			mapBrightness: 12,
			mapBaseBrightness: 0.03,
			opacity: 0.9,
			baseColor: [1.32, 0.3, 2.52],
			markerColor: [2.55, 2.55, 2.55],
			glowColor: [1.32, 0.3, 2.52],
			markers: [],
			onRender: (state) => {
				state.phi = phi;
				phi += 0.005;
				flashMarkers = flashMarkers.filter(({ startTime, duration }) => {
					return performance.now() - startTime < duration;
				});
				state.markers = [
					...markers,
					...flashMarkers.map(({ location }) => ({
						location,
						size: 0.01
					}))
				];
			}
		});
		startAddingMarkers();
	});

	onDestroy(() => {
		clearInterval(intervalId);
	});
</script>

<!-- class="border-[1.25px] border-purple-400/10 rounded-full bg-gradient-radial from-purple-opaque to-transparent" -->
<canvas bind:this={canvas} style={`width: ${size}px; height: ${size}px`} />
