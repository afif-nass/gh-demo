<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as d3 from 'd3';
	import { browser } from '$app/environment';

	export let color = 'white';
	let config = {
		width: browser ? window.innerWidth : 800, // Provide default value for SSR
		height: browser ? window.innerHeight : 600, // Provide default value for SSR
		numStars: 280,
		rotationSpeed: 0.00005,
		distributionPower: 7,
		direction: -1, // 1 for clockwise, -1 for counterclockwise
		minOpacity: 0.4,
		maxOpacity: 0.8
	};

	let svg: SVGSVGElement;
	let stars: d3.Selection<SVGCircleElement, Star, SVGGElement, unknown>;
	let starData: Star[] = [];

	interface Star {
		x: number;
		y: number;
		z: number;
		radius: number;
		baseOpacity: number;
	}

	function initStars(): Star[] {
		return d3.range(config.numStars).map(() => {
			const r =
				(Math.pow(Math.random(), 1 / config.distributionPower) *
					Math.min(config.width, config.height)) /
				2;
			const theta = Math.random() * 2 * Math.PI;
			const phi = Math.acos(2 * Math.random() - 1);
			return {
				x: r * Math.sin(phi) * Math.cos(theta),
				y: r * Math.sin(phi) * Math.sin(theta),
				z: r * Math.cos(phi),
				radius: Math.random() * 1.75 + 0.5,
				baseOpacity: Math.random() * (config.maxOpacity - config.minOpacity) + config.minOpacity
			};
		});
	}

	function updateDimensions() {
		config.width = window.innerWidth;
		config.height = window.innerHeight;
		d3.select(svg).attr('width', config.width).attr('height', config.height);
	}

	onMount(() => {
		if (!browser) return;

		const svgElement = d3.select(svg);
		starData = initStars();

		stars = svgElement
			.selectAll<SVGCircleElement, Star>('circle')
			.data(starData)
			.enter()
			.append('circle')
			.attr('r', (d) => d.radius)
			.style('fill', color);

		function animate() {
			const rotation = Date.now() * config.rotationSpeed * config.direction;

			stars
				.attr('transform', (d) => {
					const x = d.x * Math.cos(rotation) + d.z * Math.sin(rotation);
					const z = d.z * Math.cos(rotation) - d.x * Math.sin(rotation);
					const scale = config.width / 4 / (config.width / 4 + z);
					const screenX = config.width / 2 + x * scale;
					const screenY = config.height / 2 + d.y * scale;
					return `translate(${screenX}, ${screenY}) scale(${scale})`;
				})
				.style('opacity', (d) => {
					const z = d.z * Math.cos(rotation) - d.x * Math.sin(rotation);
					const scale = config.width / 4 / (config.width / 4 + z);
					return Math.max(config.minOpacity, Math.min(config.maxOpacity, d.baseOpacity * scale));
				});

			requestAnimationFrame(animate);
		}

		window.addEventListener('resize', updateDimensions);
		updateDimensions(); // Set initial dimensions

		animate();
	});

	onDestroy(() => {
		if (!browser) return;
		window.removeEventListener('resize', updateDimensions);
	});
</script>

<svg bind:this={svg} width={config.width} height={config.height} />
