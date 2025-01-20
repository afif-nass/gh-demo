import { IconBug, IconMinus, IconPlus, IconStar } from '@tabler/icons-svelte';
import { twConfig } from '$src/theme';

const colors = twConfig.theme.colors;

export function locPropsGetter(
	params: Grid.CellRenderer.Params
): Grid.CustomComponents.IconListProps {
	const data = params.value;
	return {
		iconList: [
			{
				label: 'Added',
				color: colors.affirmative.primary,
				value: data['added'],
				icon: { component: IconPlus, props: { size: '1rem' } }
			},
			{
				label: 'Removed',
				color: colors.destructive.primary,
				value: data['removed'],
				icon: { component: IconMinus, props: { size: '1rem' } }
			}
		]
	};
}

export function ticketsPropsGetter(
	params: Grid.CellRenderer.Params
): Grid.CustomComponents.IconListProps {
	const data = params.value;
	return {
		iconList: [
			{
				label: 'Bugs',
				color: colors.warning.primary,
				value: data['bugs'],
				icon: { component: IconBug, props: { size: '1rem' } }
			},
			{
				label: 'Enhancements',
				color: colors.brand.primary,
				value: data['enhancements'],
				icon: { component: IconStar, props: { size: '1rem' } }
			}
		]
	};
}
