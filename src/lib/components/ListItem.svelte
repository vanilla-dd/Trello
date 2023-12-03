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
		<div class="rounded-md bg-[#f1f2f4] shadow-md pb-2">
			<div class="pt-2 text-sm font-semibold">
				<div class="w-full text-black py-1 h-7 font-medium border-transparent">
					<input
						type="text"
						class="bg-transparent outline-none text-sm h-fit text-center w-[272px]"
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
		class="shrink-0 m-0 p-0 h-fit w-[272px] select-none"
	>
		<div class="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
			<div class="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
				<div class="w-full text-black text-sm px-2.5 py-1 h-7 font-medium border-transparent">
					{listName}
				</div>
			</div>
		</div>
	</Button>
{/if}
