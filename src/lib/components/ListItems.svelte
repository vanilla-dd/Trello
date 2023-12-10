<script lang="ts">
	import { page } from '$app/stores';
	import ListForm from '$lib/list/ListForm.svelte';
	import type { List } from '@prisma/client';
	import CardForm from './CardForm.svelte';
	import ListItem from './ListItem.svelte';
	import CardItem from './CardItem.svelte';
	import { cn } from '$lib/utils';
	export let lists: List[];
</script>

<div class="flex w-[300px] items-start gap-5 px-3">
	{#each lists as list (list.id)}
		<div
			class="no-scrollbar w-full flex-shrink-0 overflow-hidden overflow-y-hidden rounded-md bg-[#f1f2f4] pb-2 shadow-md"
		>
			<ListItem data={list} />
			<div class="no-scrollbar h-full overflow-y-scroll">
				<ol
					class={cn(
						'mx-1 flex flex-col gap-y-2 px-1 py-0.5',
						list.cards.length > 0 ? 'mt-2' : 'mt-0'
					)}
				>
					{#each list.cards as card (card.id)}
						<CardItem {card} />
					{/each}
				</ol>
				{#if $page.data.isBoardMember?.role === 'Owner' || $page.data.isBoardMember?.role === 'Coworker'}
					<CardForm boardId={list.boardId} listId={list.id} />
				{/if}
			</div>
		</div>
	{/each}
	<li class="h-full w-[272px] shrink-0 select-none list-none">
		{#if $page.data.isBoardMember?.role === 'Owner' || $page.data.isBoardMember?.role === 'Coworker'}
			<ListForm />
		{/if}
	</li>
</div>

<style>
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	.no-scrollbar {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}

	.card {
		height: 15%;
		width: 100%;
		margin: 0.4em 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #dddddd;
		border: 1px solid #333333;
	}
</style>
