import { get } from 'svelte/store';

export async function getHoverComponents(
	grid: Grid.Store
): Promise<Grid.CellHoverCard.Map | undefined> {
	const hoverCards = get(grid)?.props?.cellHoverCards;
	let hoverCardsMap: Record<string, Grid.CellHoverCard.Def> | undefined;
	let hoverComponents: Record<string, any> = {};

	if (hoverCards) {
		hoverCardsMap = Object.fromEntries(hoverCards.map((def) => [def.colId, def]));
		for (const def of hoverCards) {
			const component = (
				await import(`../../../../../components/custom/${def.componentName}.svelte`)
			).default;
			const propsGetter = def.propsGetter;
			hoverComponents[def.colId] = { component, propsGetter };
		}
	}
	return hoverComponents;
}
