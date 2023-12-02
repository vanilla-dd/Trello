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
		class="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white"
	>
		{#if data.isBoardMember?.role === 'Owner'}
			<BoardNameChange />
			<div class="ml-auto"></div>
		{:else}
			<p class="font-bold w-auto h-auto p-1 px-2 text-lg bg-transparent text-white">
				{data.boardData?.title}
			</p>
		{/if}
	</div>
	<div
		style="background-image:url('{data.boardData?.imageFullUrl}')"
		class="relative h-full bg-cover bg-no-repeat bg-center pt-20 overflow-x-scroll no-scrollbar"
	>
		{#if data.lists}
			<ListItems lists={data.lists} />
		{/if}
		<!-- <div class="text-black">
			<div class="flex gap-5 flex-col">
				{#each data.lists || [] as list}
					<br />
					{list.title}
					<div class="text-white">
						{#each list.cards as card}
							{card.listId}
							{card.title}
							{card.content}
						{/each}
					</div>

					{#if data.isBoardMember?.role === 'Owner' || data.isBoardMember?.role === 'Coworker'}
						<form action="?/createCard" method="POST">
							<input type="text" name="cardName" value="hi" />
							<input type="text" name="listId" value={list.id} />
							<input type="text" hidden class="hidden" name="boardId" value={list.boardId} />
							<button>Create Card</button>
						</form>
						<br />
					{/if}
				{/each}
			</div>
		</div> -->
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
