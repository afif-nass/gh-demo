<script lang="ts">
	import { onMount } from 'svelte';
	import { twConfig } from '$src/theme';
	import { parseISO, format } from 'date-fns';

	export let props: Grid.CustomComponents.HeatCalendarProps;

	$: data = props.data;

	let calendarData: { [key: string]: { date: string; value: number }[] } = {};

	$: if (data) {
		generateCalendarData();
	}

	function getColor(value: number): string {
		if (!value) return twConfig.theme.colors.border.light;
		return Object.values(twConfig.theme.colors.emerald)[value];
	}

	function getMonthLabel(monthKey: string) {
		const date = parseISO(`${monthKey}-01`);
		return format(date, 'MMM yyyy');
	}

	function generateCalendarData() {
		const dateMap = new Map<string, number>();
		data.forEach((d) => {
			const dateKey = d.date.split('T')[0];
			dateMap.set(dateKey, d.value);
		});
		const uniqueMonths = new Set(
			data.map((d) => {
				const dateObj = new Date(d.date);
				return `${dateObj.getUTCFullYear()}-${String(dateObj.getUTCMonth() + 1).padStart(2, '0')}`;
			})
		);
		uniqueMonths.forEach((monthKey) => {
			const [year, month] = monthKey.split('-').map(Number);
			const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
			calendarData[monthKey] = [];

			for (let day = 1; day <= daysInMonth; day++) {
				const date = new Date(Date.UTC(year, month - 1, day));
				const dateString = date.toISOString().split('T')[0];
				const value = dateMap.get(dateString) || 0;
				calendarData[monthKey].push({
					date: date.toISOString(),
					value: value
				});
			}
		});
		calendarData = calendarData;
	}
</script>

{#if Object.entries(calendarData).length}
	<div class="flex flex-wrap gap-6">
		{#each Object.entries(calendarData) as [monthKey, days]}
			<div class="flex flex-col">
				<p class="mb-1 text-[10px] uppercase text-text-light font-semibold">
					{getMonthLabel(monthKey)}
				</p>
				<div class="grid grid-cols-7 gap-1">
					{#each days as day}
						<div
							class="w-[10px] h-[10px] rounded-sm"
							style="background-color: {props.colorGetter
								? props.colorGetter(day.value)
								: getColor(day.value)}"
							title={day.date + ' - ' + day.value}
						/>
					{/each}
				</div>
			</div>
		{/each}
	</div>
{/if}
