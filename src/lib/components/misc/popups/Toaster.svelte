<script lang="ts" context="module">
	export type ToastData = {
		title: string;
		description?: string;
		color?: string;
	};

	const {
		elements: { content, title, description, close },
		helpers,
		states: { toasts },
		actions: { portal }
	} = createToaster<ToastData>({ closeDelay: 3000, type: 'background' });

	export const addToast = helpers.addToast;
</script>

<script lang="ts">
	import { createToaster, melt } from '@melt-ui/svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { IconX, IconChecks, IconAlertOctagon } from '@tabler/icons-svelte';
	import { cubicInOut } from 'svelte/easing';
	import { twConfig } from '$src/theme';

	const theme = twConfig.theme.colors;
	const colors: Record<string, string> = {
		success: theme.affirmative.primary,
		error: theme.destructive.primary
	};

	function _title(title: string) {
		return title.toLowerCase();
	}
</script>

<div class="fixed top-0 m-4 flex flex-col items-end gap-2 bottom-0 text-text-primary" use:portal>
	{#each $toasts as { id, data } (id)}
		<div
			use:melt={$content(id)}
			animate:flip={{ duration: 300 }}
			in:fly={{ duration: 150, y: '100%', easing: cubicInOut }}
			out:fly={{ duration: 150, y: '-100%', easing: cubicInOut }}
			class="rounded bg-background popup-border shadow-md"
		>
			<div
				class="relative flex w-[calc(100vw-2rem)] max-w-[290px] items-center justify-between gap-4 px-4 py-3"
			>
				<div class="flex flex-col gap-1">
					<p
						use:melt={$title(id)}
						class="flex items-center gap-[5px] font-medium"
						style={`color: ${colors[_title(data.title)]}`}
					>
						{#if _title(data.title) === 'success'}
							<IconChecks size="1.2rem" />
						{:else if _title(data.title) === 'error'}
							<IconAlertOctagon size="1.2rem" />
						{/if}
						{data.title}
					</p>
					{#if data.description}
						<p class="text-sm pl-[1px]" use:melt={$description(id)}>{data.description}</p>
					{/if}
				</div>
				<button
					use:melt={$close(id)}
					class="absolute right-4 top-4 grid place-items-center rounded-full text-inherit"
				>
					<IconX size="1.2rem" />
				</button>
			</div>
		</div>
	{/each}
</div>
