<script lang="ts">
	import { IconCalendarMonth } from '@tabler/icons-svelte';
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let value: DateValue;
</script>

<Popover.Root>
	<Popover.Trigger asChild let:builder>
		<Button
			variant="outline"
			class={cn(
				'w-[240px] justify-start text-left font-normal  rounded border-[thin] text-text-primary',
				!value && 'text-text-light'
			)}
			builders={[builder]}
		>
			<IconCalendarMonth size="1rem" class="mr-2" />
			{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0 bg-background text-text-primary popup-border" align="start">
		<Calendar />
	</Popover.Content>
</Popover.Root>
