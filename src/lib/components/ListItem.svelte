<!-- TODO: Validation for list name update -->
<script lang="ts">
	export let data: List;
	import type { List } from '@prisma/client';
	import Button from '$lib/components/ui/button/button.svelte';
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	let listName = data.title;
	let NameChange: HTMLFormElement;
	let updating: boolean;
	let editing: boolean = false;
	const escapeKey = (e: KeyboardEvent) => {
		if (!editing) {
			return;
		}
		if (editing && e.key === 'Escape') {
			editing = false;
			console.log('hi');
		}
	};
</script>

<svelte:window on:keydown={(e) => escapeKey(e)} />

{#if editing}
	<form
		bind:this={NameChange}
		action="?/listNameChange"
		method="POST"
		use:enhance={({ formData, cancel }) => {
			updating = true;
			const form = Object.fromEntries(formData);
			try {
				const { newName } = form;
				if (data.title === newName) {
					cancel();
					updating = false;
				}
			} catch (error) {
				toast.error(error.flatten().fieldErrors.newName[0]);
				listName = data.title;
				updating = false;
				cancel();
			}

			return async ({ update, result }) => {
				if (result.type === 'success') {
					toast.success('List Title Updated');
				}
				if (result.type === 'failure') {
					toast.error('Failed to update List title');
				}
				updating = false;
				await update({ reset: false });
			};
		}}
	>
		<div class="rounded-md bg-[#f1f2f4] pb-2 shadow-md">
			<div class="pt-2 text-sm font-semibold">
				<div class="h-7 w-full border-transparent py-1 font-medium text-black">
					<input
						type="text"
						class="h-fit w-[272px] bg-transparent text-center text-sm outline-none"
						name="newName"
						autofocus
						value={data.title}
						on:blur={(e) => {
							listName = e.currentTarget.value;
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
					<input type="text" hidden class="hidden" value={data.id} name="listId" />
					<input type="text" hidden class="hidden" value={data.boardId} name="boardId" />
				</div>
			</div>
		</div>
	</form>
{:else}
	<Button
		on:click={(e) => {
			editing = true;
		}}
		disabled={updating}
		class="m-0 h-fit w-[272px] shrink-0 select-none p-0"
	>
		<div class="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md">
			<div class="flex items-start justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
				<div class="h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium text-black">
					{listName}
				</div>
			</div>
		</div>
	</Button>
{/if}
