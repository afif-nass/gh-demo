<script lang="ts">
	import * as rive from '@rive-app/canvas';
	import { IconGauge } from '@tabler/icons-svelte';
	import { getContext, onDestroy, onMount } from 'svelte';
	import { type Writable } from 'svelte/store';

	const mainStore: Writable<{ mounted: boolean }> = getContext('main');

	let canv: HTMLCanvasElement;
	let r: rive.Rive;
	let audio: HTMLAudioElement;
	let layout = new rive.Layout({
		fit: rive.Fit.Fill
	});

	$: if ($mainStore.mounted) {
		r = new rive.Rive({
			src: '/misc/rive/speeding_plane.riv',
			canvas: canv,
			autoplay: true,
			stateMachines: 'mix',
			layout,
			onLoad: () => {
				r.resizeDrawingSurfaceToCanvas();
			}
		});
	}

	onDestroy(() => {
		r.cleanup();
	});
</script>

<!-- drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.7)] -->
<audio src="/sounds/seatbelt.mp3" bind:this={audio} hidden />
<div
	class="flex flex-col items-center justify-center relative w-full h-full bg-gradient-to-bl from-white to-slate-200 overflow-hidden rounded"
>
	<div class="absolute left-4 top-4 flex flex-col gap-2 h-fit *:w-fit z-10">
		<p class="text-text-primary font-sf-pro-rounded-medium text-xl tracking-wide backdrop-blur-md">
			American — AA 6218
		</p>
		<div
			class="flex items-center bg-background/30 px-2 py-[1px] rounded-full font-semibold backdrop-blur-md gap-[2px] border border-white/50 overflow-hidden shadow-sm"
			on:mouseover={() => audio.play()}
			on:focus={() => audio.play()}
			role="banner"
		>
			<div class="rounded-full p-1">
				<div class="size-2 bg-emerald-500 rounded-full animate-pulseout" />
			</div>
			<p
				class="text-emerald-500 uppercase text-[10px] tracking-tight font-sf-pro-rounded-medium font-bold"
			>
				ON time
			</p>
		</div>
	</div>
	<canvas
		bind:this={canv}
		id="canvas"
		class="flex mt-4 overflow-hidden origin-center transform rotate-90 h-full w-full rounded"
	/>
	<div
		class="absolute *:text-text-secondary right-4 top-4 flex items-center justify-center gap-1 bg-background/30 px-2 py-[1px] rounded border border-white/50 shadow-sm"
	>
		<IconGauge size="1.1rem" />
		<p class="font-sf-pro-rounded-medium tracking-wide">570 MPH</p>
	</div>
	<div class="flex justify-between items-center absolute bottom-6 w-full px-5">
		<p class="font-sf-pro-rounded-medium tracking-wide text-text-secondary min-w-fit">SFO</p>
		<div class="grid grid-cols-1 w-full items-center mx-2">
			<!-- Background bar -->
			<div class="rounded-full w-full row-start-1 col-start-1 h-[7px] bg-slate-200" />
			<!-- Progress bar -->
			<div
				class="bg-gradient-to-tr from-emerald-200 to-affirmative-primary animate-pulse rounded-full row-start-1 col-start-1 w-[230px] progress h-[7px]"
			/>
			<!-- Plane -->
			<div class="row-start-1 col-start-1 min-h-fit min-w-fit w-6 h-6 plane ml-[230px]">
				<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M18 8H12.9L6.2 0H4L8 8H3L1.3 6H0L1 10L0 14H1.3L3 12H8L4 20H6.2L12.9 12H18C19.1 12 20 11.1 20 10C20 8.9 19.1 8 18 8Z"
						fill={'#10b981'}
					/>
				</svg>
			</div>
		</div>
		<p class="font-sf-pro-rounded-medium tracking-wide text-text-secondary min-w-fit">LAX</p>
	</div>
</div>
