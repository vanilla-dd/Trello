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
<!-- <script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Plus } from 'radix-icons-svelte';
	import { Popover, PopoverTrigger, PopoverContent } from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { listCreateSchema, type ListCreateType } from '$lib/schema/formValidators';
	import type { SuperValidated } from 'sveltekit-superforms';
	import toast from 'svelte-french-toast';
	import { Loader2 } from 'lucide-svelte';
	export let form: SuperValidated<ListCreateType>;
	let popOver: boolean;
</script>



--->
{#if editing}
	<form
		bind:this={form}
		action="?/createList"
		method="POST"
		class="w-full p-3 rounded-md bg-white space-y-4 shadow-md transition"
	>
		<input
			type="text"
			name="title"
			class="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition w-full text-black"
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
		class="w-full rounded-md bg-white hover:bg-white/50 items-center p-3 font-medium text-sm transition text-black flex"
		on:click={() => (editing = true)}
	>
		<Plus class="h-4 mr-2 w-4" />
		Add a list</button
	>
{/if}
<!--

<Popover closeOnOutsideClick={true} bind:open={popOver}>
	<PopoverTrigger asChild let:builder>
		<Button builders={[builder]} variant="secondary" class="flex gap-2 items-center "
			><Plus />Add a list</Button
		>
	</PopoverTrigger>
	<PopoverContent class="w-80">
		<Form.Root
			action="?/createList"
			method="POST"
			{form}
			schema={listCreateSchema}
			let:config
			let:delayed
			options={{
				validators: listCreateSchema,
				multipleSubmits: 'prevent',
				validationMethod: 'oninput',
				onResult(event) {
					console.log(event.result.type);
					event.result.type === 'success'
						? (toast.success('List Added'), (popOver = false))
						: toast.error('Failed to add List');
				}
			}}
		>
			<Form.Field {config} name="title">
				<Form.Item>
					<Form.Label>List Name</Form.Label>
					<Form.Input />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Button
				>Submit
				{#if delayed}
					<Loader2 class="animate-spin w-4 h-4" />
				{/if}
			</Form.Button>
		</Form.Root>
	</PopoverContent>
</Popover> -->
