<script lang="ts">
	import Field from '$components/fields/Field.svelte';
	import Button from '$components/misc/Button.svelte';
	import Response from './Response.svelte';
	import { handleSubmit } from './helpers/handleSubmit';
	import { writable } from 'svelte/store';

	let submitBtn;

	export let fields: App.Components.Field.FieldDefinition[];
	export let validator: Function = () => {};
	export let requestOptions: Server.APICall = {
		method: 'POST',
		endpoint: '/',
		includeCredentials: true,
		responseType: 'JSON'
	};
	export let submitBtnConfig: App.Components.Form.SubmitButton.Config = {
		confirm: false,
		text: {
			default: 'Submit',
			submitting: 'Submitting...'
		}
	};
	export let formState = writable<App.Components.Form.FormState>({
		submitting: false,
		submitted: false,
		submitBtnFocused: false,
		response: {
			success: false,
			data: { message: 'Something went wrong.' }
		}
	});

	if ($formState.submitBtnFocused) {
		submitBtn!.focus();
	}

	const submitParams = {
		submitBtnConfig,
		fields,
		validator,
		requestOptions,
		formState
	};
</script>

<form
	on:submit|preventDefault={(e) => handleSubmit(e, submitParams)}
	enctype="multipart/form-data"
	class="w-full flex flex-col gap-5 items-start justify-start
		{$formState.submitting ? ' pointer-events-none opacity-60' : ''}"
>
	{#each fields as fieldDef}
		<Field {fieldDef} {formState} />
	{/each}
	<Response {formState} />
	<div class="w-full *:w-full h-[50px] mt-3">
		<Button
			bind:this={submitBtn}
			bind:loading={$formState.submitting}
			props={{
				text: { default: submitBtnConfig.text.default, loading: submitBtnConfig.text.submitting },
				type: 'submit',
				style: 'gradient',
				rounded: 'rounded'
			}}
		/>
	</div>
</form>
