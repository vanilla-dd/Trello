<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import PopOverForm from '$lib/components/popOverForm.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { CreditCard, User2 } from 'lucide-svelte';
	import Hint from '$lib/components/Hint.svelte';
	export let data;
</script>

<svelte:head>
	<title>Boards | Taskify</title>
</svelte:head>
<div class="pt-20">
	{#await data.allBoards?.boards}
		<div class="w-full h-20 mb-10">
			<Skeleton class=" h-full w-full p-2 bg-slate-200" />
		</div>
		<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
			<Skeleton class="aspect-video h-full w-full p-2 bg-slate-200" />
			<Skeleton class="aspect-video h-full w-full p-2 bg-slate-300" />
			<Skeleton class="aspect-video h-full w-full p-2 bg-slate-300" />
			<Skeleton class="aspect-video h-full w-full p-2 bg-slate-300" />
			<Skeleton class="aspect-video h-full w-full p-2 bg-slate-300" />
			<Skeleton class="aspect-video h-full w-full p-2 bg-slate-300" />
			<Skeleton class="aspect-video h-full w-full p-2 bg-slate-300" />
			<Skeleton class="aspect-video h-full w-full p-2 bg-slate-300" />
		</div>
	{:then allBoards}
		<div class="w-full mb-4 text-black">
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

		<div class="space-y-4 mt-2">
			<div class="flex items-center font-semibold text-lg text-neutral-700">
				<User2 class="h-6 w-6 mr-2" />
				Your Boards
			</div>
			<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
				{#each allBoards || [] as board (board.id)}
					<a
						href={`/board/${board.id}`}
						class="group relative aspect-video bg-sky-700 rounded-sm h-full w-full overflow-hidden"
					>
						<img src={board.imageThumbUrl} alt="" class="w-full h-full" />
						<div class="absolute inset-0 bg-black/30 group-hover:bg-black/40 trnasition p-2">
							<p class="relative font-semibold text-white">
								{board.title}
							</p>
						</div>
					</a>
				{/each}
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
	{/await}
</div>
