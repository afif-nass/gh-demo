<script lang="ts">
	import { fly } from 'svelte/transition';

	export let drawerState: App.State.DrawerStore;

	let dialog: HTMLDialogElement;
	let content = false;

	function checkEsc(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			$drawerState.visible = false;
			content = false;
		}
	}

	$: if (dialog) {
		if ($drawerState.visible) {
			dialog.showModal();
			content = true;
		} else if (!$drawerState.visible) {
			dialog.close();
			content = false;
		}
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	class="fixed inset-0 w-full backdrop:min-h-screen backdrop:bg-background/70 flex flex-col select-none"
	tabindex="-1"
	bind:this={dialog}
	on:close={() => ($drawerState.visible = false)}
	on:click|self={() => ($drawerState.visible = false)}
	on:keydown={checkEsc}
>
	{#if content}
		<div
			class="fixed bottom-0 left-0 right-0 w-full h-[450px] max-h-[80%] bg-background shadow-2xl rounded-t-3xl border border-border-light p-8 *:h-full *:w-full *:select-text"
			in:fly={{ y: 200, duration: 150 }}
		>
			{#if $drawerState.component}
				<svelte:component this={$drawerState.component.self} {...$drawerState.component.props} />
			{/if}
		</div>
	{/if}
</dialog>
