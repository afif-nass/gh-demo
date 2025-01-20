<script lang="ts">
	import { IconPlayerPlayFilled, IconPlayerPauseFilled, IconReload } from '@tabler/icons-svelte';
	import { tweened } from 'svelte/motion';
	import { linear } from 'svelte/easing';

	export let src = 'sounds/seatbelt.mp3';

	let audio: HTMLAudioElement;
	let duration = 0;
	let playing = false;
	let ended = false;

	const progress = tweened(0, {
		duration: 0,
		easing: linear
	});

	function onLoadedMetadata(): void {
		duration = audio.duration;
		progress.set(0, { duration: 0 });
	}

	function onPlay(): void {
		const remainingTime = duration - audio.currentTime;
		progress.set(100, { duration: remainingTime * 1000 }); // Animate progress to 100% over remaining time
		playing = true;
		ended = false;
	}

	function onPause(): void {
		progress.set((audio.currentTime / duration) * 100, { duration: 0 }); // Stop progress animation
		playing = false;
	}

	function onEnded(): void {
		progress.set(100, { duration: 0 }); // Ensure progress stays at 100%
		playing = false;
		ended = true;
	}

	function togglePlay(): void {
		if (ended) {
			audio.currentTime = 0; // Reset to start
			progress.set(0, { duration: 0 });
			ended = false;
			audio.play();
		} else {
			playing ? audio.pause() : audio.play();
		}
	}

	function seek(event: MouseEvent): void {
		const { left, width } = (event.currentTarget as HTMLElement).getBoundingClientRect();
		const percent = (event.clientX - left) / width;
		audio.currentTime = percent * duration;

		progress.set(percent * 100, { duration: 0 }); // Jump progress to the seeked position
		if (playing) {
			const remainingTime = duration - audio.currentTime;
			progress.set(100, { duration: remainingTime * 1000 }); // Resume animation to 100%
		}
	}
</script>

<div class="flex items-center w-full gap-1">
	<button on:click={togglePlay} class="text-brand-primary">
		{#if playing}
			<IconPlayerPauseFilled size="1.2rem" />
		{:else if ended}
			<IconReload size="1.2rem" stroke="2.5px" />
		{:else}
			<IconPlayerPlayFilled size="1.2rem" />
		{/if}
	</button>
	<div class="grid w-full">
		<button
			class="h-2 bg-brand-primaryLight rounded-full cursor-pointer row-start-1 col-start-1"
			on:click={seek}
		>
			<div
				class="h-full gradient rounded-full row-start-1 col-start-1"
				style="width: {$progress}%"
			/>
		</button>
	</div>
</div>

<audio
	bind:this={audio}
	hidden
	{src}
	on:loadedmetadata={onLoadedMetadata}
	on:play={onPlay}
	on:pause={onPause}
	on:ended={onEnded}
/>
