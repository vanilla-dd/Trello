<script>
	import ListItems from '$lib/components/ListItems.svelte';
	import BoardNameChange from '$lib/forms/BoardNameChange.svelte';
	export let data;
</script>

<svelte:head>
	<title>{data.boardData?.title} | Taskify</title>
</svelte:head>
<main class="h-[100dvh] pt-14">
	<div
		class="fixed top-14 z-[40] flex h-14 w-full items-center gap-x-4 bg-black/50 px-6 text-white"
	>
		{#if data.isBoardMember?.role === 'Owner'}
			<BoardNameChange />
			<div class="ml-auto"></div>
		{:else}
			<p class="h-auto w-auto bg-transparent p-1 px-2 text-lg font-bold text-white">
				{data.boardData?.title}
			</p>
		{/if}
	</div>
	<div
		style="background-image:url('{data.boardData?.imageFullUrl}')"
		class="no-scrollbar relative h-full overflow-x-scroll bg-cover bg-center bg-no-repeat pt-20"
	>
		{#if data.lists}
			<ListItems lists={data.lists} />
		{/if}
	</div>
</main>

<style>
	/* Hide scrollbar for Chrome, Safari and Opera */
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	.no-scrollbar {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
