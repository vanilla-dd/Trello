<script lang="ts">
	import toast from 'svelte-french-toast';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import { updateName } from '$lib/validator/formValidators';
	let boardName: string = $page.data.boardData.title;
	let NameChange: HTMLFormElement;
	let updating: boolean;
	let editing: boolean = false;
	const escapeKey = (e: KeyboardEvent) => {
		if (!editing) {
			return;
		}
		if (editing && e.key === 'Escape') {
			editing = false;
		}
	};
</script>

<svelte:window on:keydown={(e) => escapeKey(e)} />
{#if editing}
	<form
		bind:this={NameChange}
		action="?/boardNameChange"
		method="POST"
		class="flex items-center gap-x-2"
		use:enhance={({ formData, cancel }) => {
			updating = true;
			const data = Object.fromEntries(formData);
			try {
				const { newName } = updateName.parse(data);
				if ($page.data.boardData.title === newName) {
					cancel();
					updating = false;
				}
			} catch (error) {
				toast.error(error.flatten().fieldErrors.newName[0]);
				boardName = $page.data.boardData.title;
				updating = false;
				cancel();
			}

			return async ({ update, result }) => {
				if (result.type === 'success') {
					toast.success('Board Title Updated');
				}
				if (result.type === 'failure') {
					toast.error('Failed to update Board title');
				}
				updating = false;
				await update({ reset: false });
			};
		}}
	>
		<input
			type="text"
			class="h-auto w-auto bg-transparent pl-2 text-lg font-bold text-white outline-none"
			name="newName"
			autofocus
			value={boardName}
			on:blur={(e) => {
				boardName = e.currentTarget.value;
				editing = false;
				NameChange.requestSubmit();
			}}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					e.currentTarget.blur();
					editing = false;
				}
			}}
		/>
	</form>
{:else}
	<Button
		on:click={(e) => {
			editing = true;
		}}
		disabled={updating}
		class="h-auto w-auto bg-transparent p-1 px-2 text-lg font-bold text-white shadow-none hover:bg-white/20"
		>{boardName}</Button
	>
{/if}
