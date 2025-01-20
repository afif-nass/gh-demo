<script lang="ts">
	import { Switch } from '$components/ui/switch';
	import { shortcut } from '$src/lib/helpers/app/shortcut';
	import { mapMimeTypesToFriendlyNames } from '$lib/helpers/misc/mimeTypes';
	import { currentTime } from '$lib/helpers/formatters/time';
	import {
		IconChevronDown,
		IconCloudUpload,
		IconEye,
		IconEyeClosed,
		IconSquare,
		IconSquareCheckFilled
	} from '@tabler/icons-svelte';
	import type { ComponentType } from 'svelte';
	import { type ComponentEvents } from 'svelte';

	export let formState: App.Components.Form.FormStore | undefined = undefined;
	export let fieldDef: App.Components.Field.FieldDefinition;
	export let fieldValue = fieldDef.defaultValue ?? '';
	export const parentEvent = () => {};

	const defaultFieldConfig: App.Components.Field.FieldConfig = {
		min: 0,
		max: 100000000000,
		step: 1,
		allowedFileTypes: ['*'],
		allowMultipleFiles: false
	};
	const fieldType = fieldDef.fieldType;
	const id = fieldDef.id;
	const fieldName = fieldDef.name;
	const fieldConfig = {
		...defaultFieldConfig,
		...fieldDef.config
	};

	$: if ($formState?.submitted) {
		if (fieldType === 'password') {
			fieldValue = '';
		}
	}

	let showPw: boolean = false;
	$: type = showPw ? 'text' : 'password';
	let fieldOptions: Record<string, any> = fieldDef.valueOptions || {};
	let customComponent: ComponentType;

	// async function setComponent() {
	// 	customComponent = (await import(`../components/${fieldDef.component?.name}.svelte`)).default;
	// }

	switch (fieldType) {
		// case 'component':
		// 	setComponent();
		// 	break;
		case 'checkboxGroup':
			fieldValue = [fieldValue];
			break;
		case 'switch':
			fieldValue = false;
			break;
		case 'date': {
			const now = new Date();
			const currDate = now.toLocaleDateString('en-CA');
			fieldValue = fieldValue === 'currentDate' ? currDate : fieldValue;
			fieldConfig.min = String(fieldConfig.min) === 'currentDate' ? currDate : fieldConfig.min;
			fieldConfig.max = String(fieldConfig.max) === 'currentDate' ? currDate : fieldConfig.max;
			break;
		}
		case 'time': {
			const currTime = currentTime();
			fieldValue = fieldValue === 'currentTime' ? currTime : fieldValue;
			fieldConfig.min = String(fieldConfig.min) === 'currentTime' ? currTime : fieldConfig.min;
			fieldConfig.max = String(fieldConfig.max) === 'currentTime' ? currTime : fieldConfig.max;
			break;
		}
		default:
			break;
	}

	function handleComponentEvent(event: ComponentEvents<any>['event']) {
		fieldValue = JSON.stringify(structuredClone(event.detail));
	}

	function escape() {
		const el = document.getElementById(id);
		el?.blur();
	}
</script>

{#if fieldType === 'groupLabel'}
	<p
		class="font-semibold text-text-secondary rounded text-left uppercase {fieldDef.config?.classes}"
	>
		{fieldDef.name}
	</p>
{:else}
	<div class="flex flex-col w-full gap-[2px]">
		{#if !fieldDef.hideLabel}
			<div class="flex justify-between items-center">
				<p id="label" class="font-medium text-left max-w-prose truncate">
					{fieldDef.name + (fieldDef.required ? '*' : '')}
				</p>
				{#if fieldType === 'password'}
					<button
						type="button"
						name="Toggle password visibility"
						class="text-right text-text-secondary"
						on:click={() => (showPw = !showPw)}
					>
						{#if showPw}
							<IconEyeClosed />
						{:else}
							<IconEye />
						{/if}
					</button>
				{/if}
			</div>
		{/if}
		{#if fieldDef.help}
			<p class="text-left max-w-prose text-text-secondary w-fit mb-1">
				{fieldDef.help}
			</p>
		{/if}
		{#if fieldType === 'component'}
			<input hidden {id} type="text" name={fieldName} bind:value={fieldValue} />
			<svelte:component
				this={customComponent}
				{...fieldDef?.component?.props}
				on:event={handleComponentEvent}
			/>
		{:else if fieldType === 'text'}
			<input
				type="text"
				{id}
				autocomplete="off"
				class="user-input"
				name={fieldName}
				placeholder={fieldDef.placeholder}
				bind:value={fieldValue}
				use:shortcut={{
					shortcuts: [
						{
							code: 'Escape',
							callback: () => escape()
						}
					]
				}}
			/>
		{:else if fieldType === 'currency'}
			<div>
				<div class="relative">
					<input
						type="number"
						{id}
						name={fieldName}
						autocomplete="off"
						class="ps-9 pe-16 block w-full user-input"
						placeholder={fieldDef.placeholder}
						step={fieldConfig.step}
						min={fieldConfig.min}
						max={fieldConfig.max}
						bind:value={fieldValue}
					/>
					<div class="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
						<span class="text-text-secondary">$</span>
					</div>
					<div class="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4">
						<span class="text-text-secondary">USD</span>
					</div>
				</div>
			</div>
		{:else if fieldType === 'percent'}
			<div>
				<div class="relative">
					<input
						type="number"
						{id}
						name={fieldName}
						autocomplete="off"
						class="ps-10 block w-full user-input"
						placeholder={fieldDef.placeholder}
						step={fieldConfig.step}
						min={fieldConfig.min}
						max={fieldConfig.max}
						bind:value={fieldValue}
					/>
					<div class="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
						<span class="text-text-secondary">%</span>
					</div>
				</div>
			</div>
		{:else if fieldType === 'password'}
			<input
				autocomplete="off"
				class="user-input"
				{id}
				name={fieldName}
				placeholder={fieldDef.placeholder}
				{...{ type }}
				bind:value={fieldValue}
			/>
		{:else if fieldType === 'date'}
			<input {id} type="date" name={fieldName} bind:value={fieldValue} />
		{:else if fieldType === 'time'}
			<input {id} type="time" name={fieldName} bind:value={fieldValue} />
		{:else if fieldType === 'textarea'}
			<textarea
				{id}
				name={fieldName}
				autocomplete="off"
				class="min-h-[7rem] max-h-[1000px] user-input"
				placeholder={fieldDef.placeholder}
				cols="30"
				rows="10"
				bind:value={fieldValue}
			/>
		{:else if fieldType === 'switch'}
			<input hidden {id} type="checkbox" value={fieldValue} />
			<Switch bind:checked={fieldValue} name={id} />
		{:else if fieldType === 'number'}
			<input
				{id}
				type="number"
				name={fieldName}
				placeholder={fieldDef.placeholder}
				step={fieldConfig.step}
				min={fieldConfig.min}
				max={fieldConfig.max}
				bind:value={fieldValue}
			/>
		{:else if fieldType === 'select'}
			<div class="relative">
				<select
					{id}
					bind:value={fieldValue}
					name={fieldName}
					class="appearance-none pr-8 w-full overflow-ellipsis user-input"
				>
					<option disabled selected value> -- Select an option -- </option>
					{#each Object.entries(fieldOptions) as [value, label]}
						<option {value}>{label}</option>
					{/each}
				</select>
				<div
					class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-text-secondary"
				>
					<IconChevronDown />
				</div>
			</div>
		{:else if fieldType === 'comboBox'}
			<div class="relative">
				<input
					{id}
					class="pr-8 w-full overflow-ellipsis user-input"
					name={fieldName}
					autocomplete="off"
					bind:value={fieldValue}
					list="values"
				/>
				<datalist id="values">
					{#each Object.entries(fieldOptions) as [value, label]}
						<option {label} selected={label === fieldValue}>{label}</option>
					{/each}
				</datalist>
				<div
					class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-text-secondary"
				>
					<IconChevronDown />
				</div>
			</div>
		{:else if fieldType === 'radioGroup'}
			<div class="flex flex-wrap items-center gap-2 max-w-prose">
				<input hidden {id} type="text" bind:value={fieldValue} />
				{#each Object.entries(fieldOptions) as [value, label]}
					<label
						class="relative field rounded-full h-[35px] input-p flex items-center justify-center {fieldValue ===
						label
							? 'border-brand-primary'
							: ''}"
					>
						<input
							type="radio"
							name={fieldName}
							class="appearance-none absolute w-full h-full top-0 left-0 rounded-full border-0 focus-visible:outline-blue-700 cursor-pointer focus-visible:outline-[0.5px]"
							{value}
							bind:group={fieldValue}
						/>
						<div
							class="text-text-primary text-left flex items-center gap-2 select-none min-w-0 max-w-[290px]"
						>
							<div
								class="min-w-4 min-h-4 border rounded-full {fieldValue === label
									? 'border-[6px] border-brand-primary'
									: ''}"
							/>
							<p class="truncate">
								{label}
							</p>
						</div>
					</label>
				{/each}
			</div>
		{:else if fieldType === 'checkboxGroup'}
			<div class="flex flex-wrap items-center gap-2 max-w-prose">
				<input hidden {id} type="text" bind:value={fieldValue} />
				{#each Object.entries(fieldOptions) as [value, label]}
					<label
						for={label}
						class="relative field rounded-full h-[35px] p-3 flex items-center justify-center {fieldValue.includes(
							label
						)
							? 'border-brand-primary'
							: 'border-[thin]'}"
					>
						<input
							type="checkbox"
							name={fieldName}
							class="appearance-none absolute w-full h-full top-0 left-0 focus-visible:outline-blue-700 cursor-pointer focus-visible:outline-[0.5px]"
							{value}
							bind:group={fieldValue}
						/>
						<div class="flex items-center gap-[5px] select-none min-w-[80px] max-w-[290px]">
							<div
								class={fieldValue.includes(label) ? 'text-brand-primary' : 'text-border-secondary'}
							>
								{#if fieldValue.includes(label)}
									<IconSquareCheckFilled size={19} />
								{:else}
									<IconSquare stroke={1} size={19} />
								{/if}
							</div>
							<p class="truncate">
								{label}
							</p>
						</div>
					</label>
				{/each}
			</div>
		{:else if fieldType === 'file'}
			<div
				class="flex items-center justify-center rounded w-full [&:has(:focus-visible)]:ring-2 [&:has(:focus-visible)]:ring-blue-700"
			>
				<label
					for="dropzone-file"
					class="border flex flex-col items-center justify-center w-full h-32 rounded cursor-pointer"
				>
					<div class="flex flex-col items-center justify-center pt-5 pb-6 text-text-secondary">
						{#if fieldValue instanceof Array}
							<p class="max-w-full px-4 line-clamp-2">
								{Array.from(fieldValue)
									.map((file) => file.name)
									.join(', ')}
							</p>
						{:else}
							<IconCloudUpload size={30} />
							<p class="mb-2 text-sm text-text-secondary">
								<span class="font-semibold">Click to upload</span>
							</p>
							{#if fieldConfig.allowedFileTypes && fieldConfig.allowedFileTypes.join(',') != '*'}
								<p class="text-xs text-text-secondary">
									{'(' +
										mapMimeTypesToFriendlyNames(fieldConfig.allowedFileTypes).join(', ') +
										(' file' + (fieldConfig.allowMultipleFiles ? 's' : '') + ' only)')}
								</p>
							{/if}
						{/if}
					</div>
					<input
						{id}
						type="file"
						class="absolute opacity-0 -z-10"
						name={fieldName}
						bind:files={fieldValue}
						accept={fieldConfig.allowedFileTypes ? fieldConfig.allowedFileTypes.join(',') : '*'}
						multiple={fieldConfig.allowMultipleFiles}
					/>
				</label>
			</div>
		{/if}
	</div>
{/if}

<style>
	.user-input {
		border: 1px solid #e2e8f0;
		border-radius: 0.25rem;
		padding: 0.75rem;
		background-color: transparent;
	}
	.field {
		border: 1px solid #cbd5e0;
		border-radius: 0.25rem;
		height: 3rem;
		cursor: pointer;
	}
</style>
