<script lang="ts">
	import { Switch as SwitchPrimitive } from 'bits-ui';
	import { cn } from '$src/lib/utils';

	type $$Props = SwitchPrimitive.Props;

	let className: $$Props['class'] = undefined;
	export let checked: $$Props['checked'] = undefined;
	export { className as class };
</script>

<SwitchPrimitive.Root
	bind:checked
	class={cn(
		'peer inline-flex h-[34px] w-[64px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors data-[state=checked]:bg-brand-primary data-[state=unchecked]:bg-slate-100',
		className
	)}
	{...$$restProps}
>
	<SwitchPrimitive.Thumb
		class={cn(
			'pointer-events-none block h-[30px] w-[30px] rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[30px] data-[state=unchecked]:translate-x-0'
		)}
	/>
</SwitchPrimitive.Root>
