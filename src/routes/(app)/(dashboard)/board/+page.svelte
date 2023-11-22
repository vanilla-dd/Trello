<script lang="ts">
	import { enhance } from '$app/forms';
	import { buttonVariants } from '$lib/components/ui/button';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select';
	let visibility: string | unknown = 'public';
	export let data;
</script>

<p class="text-black">hi</p>
<button class="px-3 border-2 py-1 text-black">Create</button>
<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Create Board</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<form action="?/create" method="POST">
			<Dialog.Header>
				<Dialog.Title>Create Board</Dialog.Title>
				<Dialog.Description>Enter The Name of the Board and click Create</Dialog.Description>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-3 items-center gap-4">
					<Label>Board Name <span class="text-red-600">*</span></Label>
					<Input name="boardName" id="name" value="Pedro Duarte" class="col-span-2" />
				</div>
				<div class="grid grid-cols-3 items-center place-self-start gap-4 w-full">
					<Label>Board Visibility</Label>
					<Select.Root
						onSelectedChange={(e) => {
							visibility = e?.value;
						}}
					>
						<Select.Trigger class="col-span-2">
							<Select.Value placeholder="Visibility" />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="public">Public</Select.Item>
							<Select.Item value="private">Private</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit">Save changes</Button>
			</Dialog.Footer>
			<input type="text" hidden class="hidden" bind:value={visibility} name="visiblity" />
		</form>
	</Dialog.Content>
</Dialog.Root>
<div class="bg-black">
	{#each data.allBoards as board}
		<div class="flex gap-5">
			<a href={`/board/${board.id}`}>
				{board.title}
			</a>
		</div>
	{/each}
</div>
