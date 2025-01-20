<script lang="ts">
	import Form from '$components/form/Form.svelte';
	import { handleFormResponse } from '$components/grid/operations/serverResponses/handleFormResponse';
	import Modal from '$components/misc/popups/Modal.svelte';
	import { fly } from 'svelte/transition';
	import { getGridState } from '$components/grid/state/grid';
	import { CustomCellRenderer } from '../AGManager/cellRenderer';
	import { toTitleCase } from '$lib/helpers/formatters/strings';

	const grid = getGridState();

	let formState: App.Components.Form.FormStore;

	$: if ($formState?.submitted && $formState?.response.data) {
		handleFormResponse(formState, grid);
	}

	const cellMap: Record<string, any> = {};

	function append(node: HTMLDivElement, [header, cell]: [string, any]) {
		if (cell.cellRendererDef) {
			const cr = new CustomCellRenderer();
			cr.init(cell.cellRendererDef);
			node.append(cr.getGui());
			cellMap[header] = cr;
		} else if (cell.element) {
			node.append(cell.element.cloneNode(true));
		} else {
			node.append(cell);
		}
	}

	function refresh(header: string, cellData: any) {
		let params;
		const cellRendererInstances = cellData.getCellRenderer();
		if (cellRendererInstances.length > 0) {
			const cellDef = cellRendererInstances[0].def;
			const cellParams = cellDef?.params;
			if (cellParams && cellDef.componentName) {
				params = {
					params: cellParams,
					componentName: cellDef.componentName,
					propsGetter: cellDef.propsGetter,
					basePath: cellDef.basePath
				} as Grid.CellRenderer.Def;
				cellMap[header].refresh(params);
			}
		}
	}
</script>

<Modal bind:showModal={$grid.modal.visible} maxWidthClass={'xs:max-w-md'}>
	<h3
		slot="title"
		class="font-medium w-[80%] text-left text-ellipsis overflow-hidden whitespace-nowrap"
	>
		{$grid.modal.title}
	</h3>
	<div slot="content" class="m-auto text-left text-text-secondary">
		{#if $grid.modal?.fields?.length}
			<Form
				bind:formState
				fields={$grid.modal.fields}
				requestOptions={{
					method: 'POST',
					endpoint: $grid.modal.form.fetchURL,
					responseType: 'JSON'
				}}
				submitBtnConfig={$grid.modal.form.submissionConfig}
			/>
		{:else if $grid.modal.cells}
			<div class="flex flex-col gap-8">
				{#each Object.entries($grid.modal.cells) as [header, cellData]}
					<div in:fly|global={{ y: 100, delay: 0, duration: 800 }} class="flex flex-col gap-3">
						<p class="text-xs uppercase text-text-light border-b pb-1 border-border-secondary/30">
							{toTitleCase(header ?? '')}
						</p>
						<div
							class="w-fit"
							on:keydown={() => {}}
							role="cell"
							tabindex="-1"
							on:click={() => refresh(header, cellData)}
							use:append={[header, cellData.cell]}
						/>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</Modal>
