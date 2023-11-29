<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	let boardName = $page.data.boardData.title;
	let editing = false;
	const escapeKey = (e: KeyboardEvent) => {
		if (!editing) {
			return;
		}
		if (editing && e.key === 'Escape') {
			editing = false;
			NameChange.submit();
		}
	};
	let NameChange: HTMLFormElement;
</script>

<svelte:window on:keydown={(e) => escapeKey(e)} />
{#if editing}
	<form
		bind:this={NameChange}
		action="?/boardNameChange"
		method="POST"
		class="flex items-center gap-x-2"
		use:enhance={({ cancel }) => {
			return async ({ update, result }) => {
				await update({ invalidateAll: false, reset: false });
			};
		}}
	>
		<input
			type="text"
			class="bg-transparent outline-none font-bold text-white text-lg w-auto h-auto pl-2"
			name="newName"
			value={boardName}
			on:blur={(e) => {
				boardName = e.currentTarget.value;
				editing = false;
				NameChange.submit();
			}}
			autofocus
		/>
	</form>
{:else}
	<Button
		on:click={(e) => {
			editing = true;
		}}
		class="font-bold w-auto h-auto p-1 px-2 text-lg bg-transparent hover:bg-white/20 text-white"
		>{boardName}</Button
	>
{/if}
