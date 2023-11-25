<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { CreditCard, User2 } from 'lucide-svelte';
	import Hint from '$lib/components/Hint.svelte';
	import PopOverForm from '$lib/components/popOverForm.svelte';
	export let data;
</script>

<div class="bg-black">
	{#each data.allBoards || [] as board}
		<div class="flex gap-5">
			<a href={`/board/${board.id}`}>
				{board.title}
			</a>
		</div>
	{/each}
</div>
<div class="w-full mb-20 text-black">
	<p class="font-semibold text-4xl">
		Welcome
		<span class="text-green-500">
			{data.session?.user?.name} !
		</span>
	</p>
	<small class="text-lg flex gap-2 items-center">
		<CreditCard />
		Free
	</small>
</div>
<Separator />

<div class="space-y-4">
	<div class="flex items-center font-semibold text-lg text-neutral-700">
		<User2 class="h-6 w-6 mr-2" />
		Your Boards
	</div>
	<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
		<PopOverForm form={data.form}>
			<div
				class="aspect-video relative h-full w-full bg-slate-400 rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition text-black"
				role="button"
			>
				<p class="text-sm">Create New Board</p>
				<span class="text-xs">5 remaining</span>
				<div class="absolute bottom-0 right-2">
					<Hint />
				</div>
			</div>
		</PopOverForm>
	</div>
</div>
