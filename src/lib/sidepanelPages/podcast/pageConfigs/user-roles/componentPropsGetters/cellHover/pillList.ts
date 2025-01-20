export function pillListPropsGetter(
	params: Grid.CellHoverCard.Params
): Grid.CustomComponents.PillListProps {
	const grid = params.context.grid;
	const allRows = grid.getRows('all') || [];
	let list: string[] = [];
	const currentUserEmail = params.data.userEmail;
	if (allRows.length && currentUserEmail) {
		allRows.forEach((row: any) => {
			if (row.userEmail === currentUserEmail) {
				list.push(row.role);
			}
		});
	}
	const props = {
		title: `All of ${firstName(currentUserEmail)}'s Roles`,
		list
	};
	return props;
}

function firstName(email: string) {
	let firstName = email.split('.')[0];
	return firstName.charAt(0).toUpperCase() + firstName.slice(1);
}
