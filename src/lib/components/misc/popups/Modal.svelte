<script lang="ts">
	import { onMount } from 'svelte';
	import { IconX } from '@tabler/icons-svelte';
	import { fly } from 'svelte/transition';
	export let showModal: boolean = false;
	export let focusInput: boolean = true;
	export let maxWidthClass: string = 'xs:max-w-md';

	let dialog: HTMLDialogElement;
	let contentDiv: HTMLDivElement;

	$: if (dialog && showModal) dialog.showModal();

	function checkEsc(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			dialog.close();
		}
	}

	function focusFirstInput(element: HTMLElement): boolean {
		// Check if the current element is one of the desired types and focusable
		if (
			(element instanceof HTMLInputElement ||
				element instanceof HTMLSelectElement ||
				element instanceof HTMLTextAreaElement) &&
			!element.hidden &&
			!element.disabled
		) {
			setTimeout(() => {
				element.focus();
			}, 0);
			return true;
		}

		// Recursively check the children
		const children = Array.from(element.children) as HTMLElement[];
		for (const child of children) {
			if (focusFirstInput(child)) {
				return true;
			}
		}

		return false;
	}

	onMount(() => {
		if ($$slots.content && focusInput) {
			focusFirstInput(contentDiv as HTMLElement);
		}
	});
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	class="fixed w-full inset-0 flex flex-col popup-border backdrop:min-h-screen backdrop:bg-background/70 {maxWidthClass} isolate"
	tabindex="-1"
	bind:this={dialog}
	in:fly={{ y: 200, duration: 300 }}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	on:keydown={checkEsc}
>
	<div class="flex flex-col overflow-y-hidden">
		<div class="flex justify-between w-full p-4 border-b border-border-light">
			<slot name="title" />
			<button class="text-text-secondary" on:click={() => dialog.close()}>
				<IconX size={24} />
			</button>
		</div>
		<div bind:this={contentDiv} class="px-4 pt-6 pb-8 max-h-[70vh] overflow-y-auto">
			<slot name="content" />
		</div>
		{#if $$slots.footer}
			<div class="flex justify-end px-5 py-4 border-t-[1px]">
				<slot name="footer" />
			</div>
		{/if}
		<!-- <div slot="footer" class="flex self-end gap-4">
			<button
				class="px-4 py-[0.35rem] font-semibold bg-background border rounded shadow border-secondaryBorder text-text-secondary"
				on:click={() => (showModal = false)}>Cancel</button
			>
			<button
				class="px-4 py-1 font-bold text-white rounded bg-brand-primary"
				on:click={() => (showModal = false)}>Ok</button
			>
		</div> -->
	</div>
</dialog>

<style>
	/* dialog[open] {
		animation: zoom 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
	} */
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
