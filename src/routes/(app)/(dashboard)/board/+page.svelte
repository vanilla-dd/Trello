<script lang="ts">
	import { Settings, User2 } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import PopOverForm from '$lib/components/board/popOverForm.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import Hint from '$lib/components/app/Hint.svelte';
	import { MAX_BOARD_LIMIT } from '$lib/constant/boardLimit.js';
	export let data;
	const isPro = data.isPro?.status === 'active' ? true : false;
	const remainingLimit = MAX_BOARD_LIMIT - (data?.limitUsed?.boardLimitUsed || 0);
</script>

<svelte:head>
	<title>Boards | Taskify</title>
</svelte:head>
<div class="pt-20">
	{#await data.allBoards?.boards}
		<div class="mb-10 h-20 w-full">
			<Skeleton class=" h-full w-full bg-slate-200 p-2" />
		</div>
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
			<Skeleton class="aspect-video h-full w-full bg-slate-200 p-2" />
			<Skeleton class="aspect-video h-full w-full bg-slate-300 p-2" />
			<Skeleton class="aspect-video h-full w-full bg-slate-300 p-2" />
			<Skeleton class="aspect-video h-full w-full bg-slate-300 p-2" />
			<Skeleton class="aspect-video h-full w-full bg-slate-300 p-2" />
			<Skeleton class="aspect-video h-full w-full bg-slate-300 p-2" />
			<Skeleton class="aspect-video h-full w-full bg-slate-300 p-2" />
			<Skeleton class="aspect-video h-full w-full bg-slate-300 p-2" />
		</div>
	{:then allBoards}
		<div class="mb-4 w-full text-black">
			<p class="text-4xl font-semibold">
				Welcome
				<span class="text-green-500">
					{data.session?.user?.name} !
				</span>
			</p>
			<a
				href="/plans"
				class="flex w-max items-center gap-1 rounded-sm py-1 pl-1 pr-2 text-lg font-semibold hover:bg-slate-400 hover:text-white"
			>
				<Settings class="h-6 w-6" />
				{isPro ? 'Pro' : 'Free'}
			</a>
		</div>
		<Separator />

		<div class="mt-2 space-y-4">
			<div class="flex items-center text-lg font-semibold text-neutral-700">
				<User2 class="mr-2 h-6 w-6" />
				Your Boards
			</div>
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
				{#each allBoards || [] as board (board.id)}
					<a
						href={`/board/${board.id}`}
						class="group relative aspect-video h-full w-full overflow-hidden rounded-sm bg-sky-700"
					>
						<img src={board.imageThumbUrl} alt="" class="h-full w-full" />
						<div class="trnasition absolute inset-0 bg-black/30 p-2 group-hover:bg-black/40">
							<p class="relative font-semibold text-white">
								{board.title}
							</p>
						</div>
					</a>
				{/each}
				<PopOverForm form={data.form}>
					<div
						class="relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 rounded-sm bg-slate-400 text-black transition hover:opacity-75"
						role="button"
					>
						<p class="text-sm">Create New Board</p>
						<span class="text-xs"
							>{isPro ? 'Unlimited' : Math.max(0, remainingLimit)} remaining</span
						>
						<div class="absolute bottom-0 right-2">
							<Hint />
						</div>
					</div>
				</PopOverForm>
			</div>
		</div>
	{/await}
</div>
