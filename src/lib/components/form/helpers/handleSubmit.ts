import { findMissingFields } from './findMissingFields';
import { delay } from '$lib/helpers/misc/delay';
import { getValues } from './getValues';

export async function handleSubmit(
	event: { currentTarget: EventTarget & HTMLFormElement },
	params: {
		validator: Function;
		fields: App.Components.Field.FieldDefinition[];
		requestOptions: Server.APICall;
		submitBtnConfig: App.Components.Form.SubmitButton.Config;
		formState: App.Components.Form.FormStore;
	}
) {
	if (params.requestOptions.endpoint?.includes('/demo')) {
		params.formState.update((state) => {
			state.submitting = true;
			return state;
		});
		await delay(110);
		params.formState.update((state) => {
			state.submitted = true;
			state.submitting = false;
			state.response.success = true;
			state.response.data = { message: 'Success' };
			return state;
		});
		return;
	}

	const { formData, formDataObj } = getValues(event, params.fields);

	const missingFields = findMissingFields(params.fields || [], formData);

	const validationError: string | undefined = params.validator(formDataObj);

	if (missingFields || validationError) {
		params.formState.update((state) => {
			state.response.success = true;
			state.response.data = {
				message: missingFields
					? `The following fields are required:\n\n${missingFields}`
					: String(validationError)
			};
			return state;
		});
		return;
	}

	if (params.submitBtnConfig.confirm && !window.confirm('Please confirm')) {
		params.formState.update((state) => {
			state.submitBtnFocused = true;
			return state;
		});
		return;
	}

	params.formState.update((state) => {
		state.submitted = false;
		state.submitting = true;
		return state;
	});

	if (params.requestOptions.method === 'GET') {
		// Convert formData to URLSearchParams for GET requests
		const queryParams = new URLSearchParams();
		for (let [key, value] of formData) {
			queryParams.append(key, String(value));
		}
		params.requestOptions.queryParams = queryParams;
	} else {
		// Convert formData to a plain object for other request types
		params.requestOptions.body = formDataObj;
	}

	try {
		const response = '';
		const responseFinal =
			params.requestOptions.responseType === 'JSON' ? await response.json() : await response.text();
		params.formState.update((state) => {
			state.response.success = response.ok;
			state.response.data = responseFinal;
			return state;
		});
	} catch (e) {
		params.formState.update((state) => {
			state.response.data = { message: String(e) };
			return state;
		});
	}

	params.formState.update((state) => {
		state.submitted = true;
		state.submitting = false;
		return state;
	});
}
