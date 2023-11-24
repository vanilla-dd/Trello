<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import CreateBoard from '$lib/forms/CreateBoard.svelte';
	export let data;
</script>

<p class="text-black">hi</p>
<button class="px-3 border-2 py-1 text-black">Create</button>
<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Create Board</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<CreateBoard form={data.form} />
	</Dialog.Content>
</Dialog.Root>
<div class="bg-black">
	{#each data.allBoards || [] as board}
		<div class="flex gap-5">
			<a href={`/board/${board.id}`}>
				{board.title}
			</a>
		</div>
	{/each}
</div>
