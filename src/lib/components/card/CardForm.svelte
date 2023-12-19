<!-- TODO: Validation for list name update -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import { Plus } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import Button from '$lib/components/ui/button/button.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	export let boardId: string;
	export let listId: string;
	let newCardFrom: HTMLFormElement;
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
<div class="px-2">
	{#if editing}
		<div class="flex justify-center pt-2">
			<Card.Root class="w-[98%]">
				<Card.Content class="px-3 pb-3 pt-6">
					<form
						bind:this={newCardFrom}
						action="?/createCard"
						method="POST"
						use:enhance={({ formData, cancel }) => {
							updating = true;
							const form = Object.fromEntries(formData);
							console.log(form);
							// cancel();
							return async ({ update, result }) => {
								if (result.type === 'success') {
									toast.success('Card Added');
								}
								if (result.type === 'failure') {
									toast.error('Failed to add Card');
								}
								updating = false;
								editing = false;
								await update();
							};
						}}
					>
						<div class="grid w-full items-center gap-2">
							<Input
								autofocus
								id="cardTitle"
								type="text"
								name="cardTitle"
								disabled={updating}
								placeholder="Enter Card Title"
							/>
							<Textarea
								on:keydown={(e) => {
									if (e.key === 'Enter') {
										e.currentTarget.blur();
										editing = false;
									}
								}}
								id={listId}
								placeholder="Enter Card Content"
								name="cardContent"
								disabled={updating}
								class={'resize-none shadow-sm outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0'}
							/>
							<input type="hidden" name="listId" hidden class="hidden" value={listId} />
							<input type="hidden" name="boardId" hidden class="hidden" value={boardId} />
						</div>
					</form>
				</Card.Content>
				<Card.Footer class="flex justify-between px-3 pb-3">
					<Button
						variant="outline"
						on:click={() => (editing = false)}
						type="button"
						size="sm"
						disabled={updating}>Cancel</Button
					>
					<Button
						size="sm"
						class="h-7"
						on:click={() => newCardFrom.requestSubmit()}
						disabled={updating}>Create</Button
					>
				</Card.Footer>
			</Card.Root>
		</div>
	{:else}
		<div class="px-2 pt-2"></div>
		<Button
			on:click={() => {
				editing = true;
			}}
			disabled={updating}
			class="h-auto w-full justify-start rounded-md px-2 py-2 text-sm text-muted-foreground "
			size="sm"
			variant="ghost"
		>
			<Plus class="mr-2 h-4 w-4" />
			Add a card
		</Button>
	{/if}
</div>
