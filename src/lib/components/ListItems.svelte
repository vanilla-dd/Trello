<script lang="ts">
	import { setDebugMode } from 'svelte-dnd-action';
	setDebugMode(true);
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	const flipDurationMs = 200;
	import { page } from '$app/stores';
	import ListForm from '$lib/list/ListForm.svelte';
	import type { Card, List } from '@prisma/client';
	import CardForm from './CardForm.svelte';
	import ListItem from './ListItem.svelte';
	import CardItem from './CardItem.svelte';
	import { cn } from '$lib/utils';
	export let lists: List[];
	function handleDndConsiderColumns(e: CustomEvent<DndEvent<List>>) {
		lists = e.detail.items;
	}
	function handleDndFinalizeColumns(e: CustomEvent<DndEvent<List>>) {
		lists = e.detail.items;
	}
	function handleDndConsiderCards(cid: string, e: CustomEvent<DndEvent<Card>>) {
		const colIdx = lists.findIndex((c) => c.id === cid);
		lists[colIdx].cards = e.detail.items;
		lists = [...lists];
	}
	function handleDndFinalizeCards(cid: string, e: CustomEvent<DndEvent<Card>>) {
		const colIdx = lists.findIndex((c) => c.id === cid);
		lists[colIdx].cards = e.detail.items;
		lists = [...lists];
	}
	function handleClick(e: CustomEvent<DndEvent>) {
		alert('dragabble elements are still clickable :)');
	}
</script>

<div
	class="flex w-max items-start gap-5 px-3"
	use:dndzone={{ items: lists, flipDurationMs, type: 'columns' }}
	on:consider={handleDndConsiderColumns}
	on:finalize={handleDndFinalizeColumns}
>
	{#each lists as list (list.id)}
		<div animate:flip={{ duration: flipDurationMs }}>
			<div
				class="no-scrollbar w-[272px] flex-shrink-0 overflow-hidden overflow-y-hidden rounded-md bg-[#f1f2f4] pb-2 shadow-md"
				id="card"
			>
				<ListItem data={list} />
				<div class="no-scrollbar h-full overflow-y-scroll">
					<ol
						use:dndzone={{ items: list.cards, flipDurationMs }}
						on:consider={(e) => handleDndConsiderCards(list.id, e)}
						on:finalize={(e) => handleDndFinalizeCards(list.id, e)}
						class={cn(
							'mx-1 flex flex-col gap-y-2 px-1 py-0.5',
							list.cards.length > 0 ? 'mt-2' : '-mb-4 mt-0 py-3'
						)}
					>
						{#each list.cards as card (card.id)}
							<div animate:flip={{ duration: flipDurationMs }}>
								<div id="card">
									<CardItem {card} />
								</div>
							</div>
						{/each}
					</ol>
					{#if $page.data.isBoardMember?.role === 'Owner' || $page.data.isBoardMember?.role === 'Coworker'}
						<CardForm boardId={list.boardId} listId={list.id} />
					{/if}
				</div>
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
	:global(#dnd-action-dragged-el > #card) {
		transform: rotate(7deg);
	}
</style>
