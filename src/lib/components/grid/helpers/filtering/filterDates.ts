export function filterDates(selectedDate: Date, cellValue: string) {
	if (cellValue == null) {
		return 0;
	}
	const cellDate = new Date(cellValue);
	const selectedDateOnly = new Date(
		selectedDate.getFullYear(),
		selectedDate.getMonth(),
		selectedDate.getDate()
	);
	const cellDateOnly = new Date(cellDate.getFullYear(), cellDate.getMonth(), cellDate.getDate());
	// Check if the dates are on the same day
	if (selectedDateOnly.getTime() === cellDateOnly.getTime()) {
		return 0;
	}
	// Full datetime check for dates not on the same day
	if (cellDate < selectedDate) {
		return -1;
	} else if (cellDate > selectedDate) {
		return 1;
	}
}
