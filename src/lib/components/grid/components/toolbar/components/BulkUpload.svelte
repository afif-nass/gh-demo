<script lang="ts">
	import { handleAPIResponse } from '$lib/components/grid/operations/serverResponses/handleAPIResponse';
	import { IconUpload } from '@tabler/icons-svelte';
	import { getGridState } from '$components/grid/state/grid';
	import { addToast } from '$components/misc/popups/Toaster.svelte';

	const grid = getGridState();

	let uploading = false;
	let bulkUploadFileInput: HTMLInputElement;
	let files: FileList;

	$: if (files) {
		createRecords();
	}

	async function createRecords() {
		$grid.mutateAction = 'Bulk upload';
		handleAPIResponse(
			{
				success: true,
				responseMessage: ''
			},
			grid
		);
		bulkUploadFileInput.value = '';
		uploading = false;
		return;
	}

	async function uploadFile() {
		const files = bulkUploadFileInput.files;
		if (!files || !files.length) return;
		uploading = true;
		const uploadJob = await fetch(String($grid.props?.actions?.createRecords?.endpoint), {
			method: 'POST',
			body: files[0]
		});
		if (uploadJob.ok) {
			addToast({
				data: {
					title: 'Success',
					description: 'Uploaded file',
					color: 'green'
				}
			});
		} else {
			addToast({
				data: {
					title: 'Error',
					description: 'Something went wrong',
					color: 'red'
				}
			});
		}
		bulkUploadFileInput.value = '';
		uploading = false;
	}
</script>

{#if $grid.props?.actions?.createRecords?.bulk}
	<button class="action-btn" disabled={uploading} on:click={() => bulkUploadFileInput.click()}>
		<IconUpload size="1rem" />
		{uploading ? 'Uploading...' : 'Bulk'}
	</button>
	<input
		type="file"
		class="hidden appearance-none"
		accept=".csv"
		multiple={false}
		bind:this={bulkUploadFileInput}
		bind:files
	/>
{/if}
