<script lang="ts">
	import { cn } from '$src/lib/utils';
	import type { HTMLTdAttributes } from 'svelte/elements';

	type $$Props = HTMLTdAttributes;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<td
	class={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</td>
