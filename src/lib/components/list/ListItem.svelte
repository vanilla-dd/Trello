<!-- TODO: Validation for list name update -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import type { List } from '@prisma/client';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ZodError } from 'zod';
	export let data: List;
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
				if (error instanceof ZodError) {
					toast.error(error?.flatten()?.fieldErrors?.newName?.[0] || 'Failed to update List title');
				} else {
					toast.error('Failed to update List title');
				}
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
		<div class="rounded-md pb-2 shadow-md">
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
		class="m-0 h-fit w-[276px] shrink-0 select-none p-0 pt-2 text-sm font-semibold"
	>
		<div
			class="h-7 w-full rounded-md border-transparent py-1 pb-8 text-sm font-medium text-black shadow-md"
		>
			{listName}
		</div>
	</Button>
{/if}
