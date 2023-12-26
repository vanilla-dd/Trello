<script lang="ts">
	import type { Card } from '@prisma/client';
	import { dndzone } from 'svelte-dnd-action';
	import { cn } from '$lib/utils';
	import { flip } from 'svelte/animate';
	import { page } from '$app/stores';
	import ListForm from '$lib/forms/ListForm.svelte';
	import ListItem from './ListItem.svelte';
	import CardForm from '../card/CardForm.svelte';
	import CardItem from '../card/CardItem.svelte';
	type List = {
		id: string;
		title: string;
		boardId: string;
		position: number;
		createdAt: Date;
		updatedAt: Date;
		cards: Card[];
	};
	export let lists: List[];
	const flipDurationMs = 200;
	function handleDndConsiderColumns(e: CustomEvent<DndEvent<List>>) {
		lists = e.detail.items;
	}
	function handleDndFinalizeColumns(e: CustomEvent<DndEvent<List>>) {
		lists = e.detail.items;
		e.detail.items.map(async (item: List, index: number) => {
			if (item.position === index + 1) {
				return;
			}
			if (item.position !== index + 1) {
				const res = await fetch('/api/updateList', {
					body: JSON.stringify({ item, index }),
					method: 'PATCH'
				});
				// fallback
				if (!res.ok) {
					console.log('hi');
					lists = $page.data.lists;
				}
			}
		});
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

		e.detail.items.map(async (item: Card, index: number) => {
			if (item.position === index + 1 && item.listId === cid) {
				return;
			}
			const res = await fetch('/api/updateCard', {
				body: JSON.stringify({ item: { id: item.id, listId: cid, index } }),
				method: 'PATCH'
			});
		});
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
		<div
			class="no-scrollbar w-[272px] flex-shrink-0 overflow-hidden overflow-y-hidden rounded-md bg-[#f1f2f4] pb-2 shadow-md"
			animate:flip={{ duration: flipDurationMs }}
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
		transform: scale(0.9);
	}
</style>
