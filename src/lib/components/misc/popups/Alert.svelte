<script lang="ts">
	import { fly } from 'svelte/transition';
	import Button from '$components/misc/Button.svelte';

	export let alertState: App.State.AlertStore;

	let dialog: HTMLDialogElement;

	$: if (dialog) {
		if ($alertState.visible) {
			dialog.showModal();
		} else if (!$alertState.visible) {
			dialog.close();
		}
	}

	const buttons: App.Components.Button[] = [
		{ text: { default: 'Cancel' }, style: 'shadow', onClickFunc: close },
		{ text: { default: 'Confirm' }, style: 'solid' }
	];

	function close() {
		dialog.close();
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	class="fixed inset-0 popup-border backdrop:min-h-screen backdrop:bg-background/70 backdrop:w-full backdrop:backdrop-blur-sm w-full max-w-[400px]"
	tabindex="-1"
	on:close={() => ($alertState.visible = false)}
	bind:this={dialog}
	in:fly={{ y: 200, duration: 300 }}
>
	<div class="flex flex-col p-6 gap-4">
		<div class="flex flex-col gap-2">
			<p class="font-semibold text-lg">{$alertState.title}</p>
			{#if $alertState.description}
				<p class="text-sm text-text-light">{$alertState.description}</p>
			{/if}
		</div>
		<div class="flex self-end gap-2 *:w-fit *:px-4 h-8">
			{#each buttons as button}
				<Button props={button} />
			{/each}
		</div>
	</div>
</dialog>
