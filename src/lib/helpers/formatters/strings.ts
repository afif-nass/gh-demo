export function friendlyName(field: string) {
	const words = field.split('_');
	const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
	return capitalizedWords.join(' ');
}

export function capitalizeFirstLetter(word: string): string {
	if (word.length === 0) {
		return word;
	}
	return word.charAt(0).toUpperCase() + word.slice(1);
}

export const toCamelCase = (sentence: string): string =>
	sentence
		.toLowerCase()
		.replace(/(?:^\w|[A-Z]|\b\w|\s+\w)/g, (match, index) =>
			index === 0 ? match.toLowerCase() : match.toUpperCase().replace(/\s+/g, '')
		);

export function formatNameFromDashes(path: string): string {
	return path
		.split('/')
		.pop()!
		.replace(/-/g, ' ')
		.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function toTitleCase(input: string): string {
	if (input === 'ID' || input === input.toLowerCase()) {
		return input.toUpperCase();
	}
	return input
		.replace(/([A-Z])/g, ' $1') // Add a space before each uppercase letter
		.replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
		.toLowerCase()
		.replace(/\b\w/g, (str) => str.toUpperCase()) // Capitalize each word
		.trim(); // Remove leading/trailing spaces
}
