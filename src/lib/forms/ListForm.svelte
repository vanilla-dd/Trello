<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Plus, X } from 'lucide-svelte';
	let editing: boolean = false;
	let form: HTMLFormElement;
	let ListName: string;
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
		bind:this={form}
		action="?/createList"
		method="POST"
		class="w-full space-y-4 rounded-md bg-white p-3 shadow-md transition"
	>
		<input
			type="text"
			name="title"
			class="h-7 w-full border-transparent px-2 py-1 text-sm font-medium text-black transition hover:border-input focus:border-input"
			placeholder="Enter list title..."
			bind:value={ListName}
			autofocus
		/>
		<input type="text" name="boardId" hidden class="hidden" value={$page.data.boardData.id} />
		<div class="flex items-center gap-x-1">
			<Button type="submit" class="bg-blue-600 text-white hover:bg-blue-300 focus:bg-blue-300 "
				>Add list</Button
			>
			<Button
				type="button"
				variant={'ghost'}
				size={'sm'}
				class="text-black"
				on:click={() => {
					editing = false;
				}}><X class="h-5 w-5" /></Button
			>
		</div>
	</form>
{:else}
	<button
		class="flex w-full items-center rounded-md bg-white p-3 text-sm font-medium text-black transition hover:bg-white/50"
		on:click={() => (editing = true)}
	>
		<Plus class="mr-2 h-4 w-4" />
		Add a list</button
	>
{/if}
