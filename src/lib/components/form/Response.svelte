<script lang="ts">
	import { IconCircleCheckFilled, IconCircleXFilled } from '@tabler/icons-svelte';

	export let formState: App.Components.Form.FormStore;

	$: success = $formState.response.success;
	$: responseMessage = $formState.response.data;
</script>

{#if $formState.submitted}
	<div
		class="{success
			? 'bg-affirmative-secondary/50 text-affirmative-primary'
			: 'bg-destructive-secondary/50 text-destructive-primary'}
			p-4 rounded flex flex-col text-left w-full gap-4"
	>
		<div class="flex items-center gap-2">
			{#if success}
				<IconCircleCheckFilled size={20} />
			{:else}
				<IconCircleXFilled size={20} />
			{/if}
			<p class="font-bold text-inherit">
				{success ? 'Success' : 'Error'}
			</p>
		</div>
		{#if responseMessage && responseMessage.length}
			<p
				class="{success
					? 'text-affirmative-primary'
					: 'text-destructive-primary'} max-w-prose whitespace-pre-line"
			>
				{responseMessage}
			</p>
		{/if}
	</div>
{/if}
