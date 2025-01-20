import * as datefns from 'date-fns';

export function formatDate(value: Date | string, targetFormat: string): string {
	if (!value) {
		return '';
	}

	let date: Date;

	// Convert to Date object if string is provided
	if (typeof value === 'string') {
		date = new Date(value);
	} else {
		date = value;
	}

	// Check if the input date has time (HH:mm part is not '00:00')
	let hasTime = datefns.format(date, 'HH:mm') !== '00:00';

	// Standardize the date format
	if (!hasTime) {
		date = datefns.parseISO(datefns.format(date, 'yyyy-MM-dd') + 'T00:00:00Z');
	} else {
		date = datefns.parseISO(date.toISOString());
	}

	switch (targetFormat) {
		case 'datetime':
			// YYYY-MM-DD HH:MM:SS
			return datefns.format(date, 'yyyy-MM-dd HH:mm:ss');
		case 'locale-datetime':
			// Locale-specific datetime
			return datefns.format(date, 'Pp');
		case 'relative':
			// "3 days ago" or "in 3 days"
			return datefns.formatDistanceToNow(date, { addSuffix: true });
		case 'friendly':
			// May 5, 2022 at 4:45PM
			return datefns.format(date, "MMM d, yyyy 'at' h:mmaaa");
		case 'friendly-no-time':
			// May 5, 2022
			return datefns.format(date, 'MMM d, yyyy');
		case 'friendly-no-time-no-year':
			// May 5
			return datefns.format(date, 'MMM d');
		default:
			return date.toString();
	}
}
