<script lang="ts">
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import * as Command from '$components/ui/command';
	import * as Popover from '$components/ui/popover';
	import { Button } from '$components/ui/button';
	import { cn } from '$src/lib/utils';
	import { tick } from 'svelte';
	import { Select } from 'bits-ui';

	export let options: {
		value: string;
		label: string;
	}[];
	let open = false;
	let value = '';

	$: selectedValue = options.find((f) => f.value === value)?.label ?? 'Select';

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	function onSelect(x: any, ids: any) {
		{
			value = x;
			closeAndFocusTrigger(ids.trigger);
		}
	}
</script>

<Popover.Root bind:open let:ids>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="outline"
			role="combobox"
			aria-expanded={open}
			class="w-[200px] justify-between text-text-primary"
		>
			{selectedValue}
			<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0 z-[99999999] bg-background max-h-[50vh]">
		<Command.Root class="max-h-[50vh]">
			<Command.Input placeholder="Search..." />
			<Command.Empty>Nothing found.</Command.Empty>
			<Command.Group>
				{#each options as option}
					<Command.Item
						class="hover:bg-muted text-text-primary"
						value={option.value}
						onSelect={(x) => onSelect(x, ids)}
					>
						<Check class={cn('mr-2 h-4 w-4', value !== option.value && 'text-transparent')} />
						{option.label}
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
