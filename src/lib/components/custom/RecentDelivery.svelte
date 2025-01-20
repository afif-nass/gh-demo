<script lang="ts">
	import { twConfig } from '$src/theme';

	export let props: Data;

	type RecentDelivery = Grid.CustomComponents.RecentDeliveryProps;
	type Data = RecentDelivery[];

	const containerHeight = 50;
	const colors = twConfig.theme.colors;

	$: recentDelivery = Object.assign([], props || []);

	$: maxActualOrExpected = Math.max(
		...recentDelivery.map((delivery: RecentDelivery) =>
			Math.max(delivery.actual || 0, delivery.expected || 50)
		)
	);

	$: scaleFactor = containerHeight / maxActualOrExpected;

	$: normalizedRecentDelivery = normalizeRecentDelivery(scaleFactor);

	function normalizeRecentDelivery(scaleFactor: number): Data {
		return recentDelivery.map((delivery: RecentDelivery) => {
			const expected = (delivery.expected || 50) * scaleFactor;
			const actual = (delivery.actual || (delivery.expected * 85) / 100) * scaleFactor;
			return {
				...delivery,
				expected: Math.min(expected, containerHeight),
				actual: Math.min(actual, containerHeight)
			};
		});
	}

	function getBarColor(day: RecentDelivery): string {
		const percent = (day.actual / day.expected) * 100;
		if (percent >= 85) {
			return colors.affirmative.primary;
		} else if (percent < 65) {
			return colors.destructive.primary;
		}
		return colors.warning.primary;
	}
</script>

<div class="flex gap-2 items-end" style="height: {containerHeight + 12}px;">
	{#each normalizedRecentDelivery as day}
		<div class="flex flex-col justify-end gap-1 w-[7px] h-full">
			<div class="grid grid-cols-1 items-end w-full">
				<div
					class="border border-slate-100 rounded-sm w-full row-start-1 col-start-1"
					style="height: {day.expected}px;"
				/>
				<div
					class="rounded-sm w-full row-start-1 col-start-1"
					style="height: {day.actual}px; background-color: {getBarColor(day)}"
				/>
			</div>
			<div class="w-full h-[3px] rounded-full" style="background-color: {getBarColor(day)}" />
		</div>
	{/each}
</div>
