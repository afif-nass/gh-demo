export function getValues(
	event: { currentTarget: EventTarget & HTMLFormElement },
	fields: App.Components.Field.FieldDefinition[]
) {
	const formData = new FormData(event.currentTarget);
	const formDataObj: Record<string, any> = {};

	const elementsWithId = event.currentTarget.querySelectorAll('[id]');

	for (let element of elementsWithId) {
		const inputElement = element as HTMLInputElement;
		let key = inputElement.id;
		let value: any = inputElement.value;
		const elementDef = fields.find((obj) => obj['id'] === key);
		switch (elementDef?.fieldType) {
			case 'number':
			case 'currency':
			case 'percent':
				value = Number(value);
				break;
			case 'switch':
				value = value === 'true' ? true : false;
				break;
		}
		if (elementDef?.asNumber) {
			value = Number(value);
		}
		if (elementDef?.asObject) {
			value = JSON.parse(value);
		}
		formDataObj[key] = value;
	}

	return { formData, formDataObj };
}
