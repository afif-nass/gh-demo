export type JsonObject = Record<string, any>;

export function jsonToTsv(jsonData: JsonObject): string {
	if (typeof jsonData !== 'object' || jsonData === null) {
		return '';
	}

	const headers = Object.keys(jsonData);
	const tsvRows = [headers.join('\t')];

	const dataRow = headers.map((fieldName) => {
		let field = jsonData[fieldName];
		if (field === null || field === undefined) {
			field = '';
		} else if (Array.isArray(field)) {
			field = field.map((item) => JSON.stringify(item)).join(', ');
		} else if (typeof field === 'object') {
			field = JSON.stringify(field);
		} else {
			field = field.toString();
		}

		field = field.replace(/(\t|\n|\r)/g, ' ');
		return field;
	});

	tsvRows.push(dataRow.join('\t'));
	return tsvRows.join('\n');
}

export function jsonToCsv(jsonData: JsonObject): string {
	if (typeof jsonData !== 'object' || jsonData === null) {
		return '';
	}
	const headers = Object.keys(jsonData);
	const csvRows = [headers.join(',')];
	const dataRow = headers.map((fieldName) => {
		let field = jsonData[fieldName];
		if (field === null || field === undefined) field = '';
		field = field.toString().replace(/"/g, '""');
		if (field.search(/("|,|\n)/g) >= 0) {
			field = `"${field}"`;
		}
		return field;
	});
	csvRows.push(dataRow.join(','));
	return csvRows.join('\n');
}

export function jsonToList(jsonData: JsonObject): string {
	let listString = '';
	for (const key in jsonData) {
		if (jsonData.hasOwnProperty(key)) {
			let value = jsonData[key];
			if (Array.isArray(value)) {
				value = value.map((item) => JSON.stringify(item)).join(', ');
			} else if (typeof value === 'object' && value !== null) {
				value = JSON.stringify(value);
			}
			listString += `${key}: ${value}\n`;
		}
	}
	return listString.trim();
}
