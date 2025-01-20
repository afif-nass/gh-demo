import * as AG from 'ag-grid-community';

export async function onCellMouseOver(
	event: AG.CellMouseOverEvent,
	cellHoverCard: Grid.CellHoverCard.Store,
	hoverComponents: Grid.CellHoverCard.Map | undefined
) {
	const targetHoverCard = hoverComponents
		? hoverComponents[String(event.colDef.colId)] ?? null
		: null;
	if (targetHoverCard) {
		cellHoverCard.set({
			rendered: true,
			component: targetHoverCard.component,
			props: targetHoverCard.propsGetter(event)
		});
	}
}
