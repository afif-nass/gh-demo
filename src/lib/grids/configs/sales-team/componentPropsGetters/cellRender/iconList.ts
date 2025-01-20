import { IconConfetti, IconHourglass, IconThumbDown } from '@tabler/icons-svelte';
import { twConfig } from '$src/theme';

const colors = twConfig.theme.colors;

export function iconListPropsGetter(
	params: Grid.CellRenderer.Params
): Grid.CustomComponents.IconListProps {
	const value = params.value;
	return {
		iconList: [
			{
				label: 'Won',
				color: colors.affirmative.primary,
				value: value['won'],
				icon: {
					component: IconConfetti,
					props: { size: '1rem', color: colors.affirmative.primary }
				}
			},
			{
				label: 'Lost',
				color: colors.destructive.primary,
				value: value['lost'] ?? 0,
				icon: {
					component: IconThumbDown,
					props: { size: '1rem', color: colors.destructive.primary }
				}
			},
			{
				label: 'In progress',
				color: colors.warning.primary,
				value: value['inProgress'],
				icon: { component: IconHourglass, props: { size: '1rem', color: colors.warning.primary } }
			}
		]
	};
}
