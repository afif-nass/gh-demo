export function sortDates(cellValueA: string, cellValueB: string) {
	if (cellValueA == null && cellValueB == null) {
		return 0;
	}
	if (cellValueA == null) {
		return -1;
	}
	if (cellValueB == null) {
		return 1;
	}
	const dateA = new Date(cellValueA);
	const dateB = new Date(cellValueB);
	if (dateA < dateB) {
		return -1;
	} else if (dateA > dateB) {
		return 1;
	} else {
		return 0;
	}
}
