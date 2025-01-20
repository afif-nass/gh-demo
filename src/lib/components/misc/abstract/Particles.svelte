<script lang="ts">
	import Particles, { particlesInit } from '@tsparticles/svelte';
	import { loadSlim } from '@tsparticles/slim';

	export let color = '#ffffff';

	let particlesConfig = {
		fullScreen: false,
		particles: {
			color: {
				value: color
			},
			opacity: {
				value: { min: 0.01, max: 1 }
			},
			size: {
				value: 1.5
			},
			move: {
				enable: true,
				speed: 0.1
			},
			number: {
				value: 1500
			}
		}
	};

	void particlesInit(async (engine) => {
		await loadSlim(engine);
	});
</script>

<Particles id="tsparticles" class="h-full w-full" options={particlesConfig} />
