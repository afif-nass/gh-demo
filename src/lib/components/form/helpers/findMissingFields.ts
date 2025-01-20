export function findMissingFields(
	funcFields: App.Components.Field.FieldDefinition[],
	formData: FormData
) {
	if (!funcFields) {
		return;
	}
	const missingFields = [];
	for (const field of funcFields) {
		if (field.required) {
			const value = formData.get(field.name);
			if (value === null || value === '' || (value instanceof File && value.size === 0)) {
				missingFields.push(field.name);
			}
		}
	}
	return missingFields.join('\n');
}
