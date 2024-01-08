<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { listCreateSchema } from '$lib/validator/formValidators';
	import { Plus, X, Loader2 } from 'lucide-svelte';
	import toast from 'svelte-french-toast';
	import { ZodError } from 'zod';
	let editing: boolean = false;
	let form: HTMLFormElement;
	let ListName: string;
	let updating = false;
	const escapeKey = (e: KeyboardEvent) => {
		if (!editing) {
			return;
		}
		if (editing && e.key === 'Escape' && !updating) {
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
		use:enhance={({ formData, cancel }) => {
			updating = true;
			const data = Object.fromEntries(formData);
			try {
				const { boardId, title } = listCreateSchema.parse(data);
			} catch (error) {
				if (error instanceof ZodError) {
					toast.error(error.flatten()?.fieldErrors?.title?.[0] ?? "Can't create List");
				} else {
					toast.error("Can't create List");
				}
				updating = false;
				cancel();
			}
			return async ({ update, result }) => {
				if (result.type === 'success') {
					toast.success('List Created');
					ListName = '';
				}
				if (result.type === 'failure') {
					toast.error('Failed to Create List');
				}
				updating = false;
				editing = false;
				await update();
			};
		}}
	>
		<input
			type="text"
			name="title"
			class="h-7 w-full border-transparent px-2 py-1 text-sm font-medium text-black transition hover:border-input focus:border-input"
			placeholder="Enter list title..."
			bind:value={ListName}
			autofocus
			disabled={updating}
		/>
		<input type="text" name="boardId" hidden class="hidden" value={$page.data.boardData.id} />
		<div class="flex items-center gap-x-1">
			<Button
				disabled={updating}
				type="submit"
				class="bg-blue-600 text-white hover:bg-blue-300 focus-visible:bg-blue-300"
			>
				Add list
				{#if updating}
					<Loader2 class="ml-1 h-4 w-4 animate-spin" />
				{/if}
			</Button>
			<Button
				type="button"
				variant={'ghost'}
				size={'sm'}
				class="text-black"
				disabled={updating}
				on:click={() => {
					!updating ? (editing = false) : null;
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
