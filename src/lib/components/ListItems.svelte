<script lang="ts">
	import { page } from '$app/stores';
	import ListForm from '$lib/list/ListForm.svelte';
	import type { List } from '@prisma/client';
	import ListItem from './ListItem.svelte';
	export let lists: List[];
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	const flipDurationMs = 200;
	function handleDndConsiderColumns(e) {
		lists = e.detail.items;
	}
	function handleDndFinalizeColumns(e) {
		lists = e.detail.items;
	}
	function handleDndConsiderCards(cid, e) {
		const colIdx = lists.findIndex((c) => c.id === cid);
		lists[colIdx].cards = e.detail.items;
		lists = [...lists];
	}
	function handleDndFinalizeCards(cid, e) {
		const colIdx = lists.findIndex((c) => c.id === cid);
		lists[colIdx].cards = e.detail.items;
		lists = [...lists];
	}
	function handleClick(e) {
		alert('dragabble elements are still clickable :)');
	}
</script>

<ol class="flex h-full gap-x-3">
	<section
		class="board"
		use:dndzone={{ items: lists, flipDurationMs, type: 'columns' }}
		on:consider={handleDndConsiderColumns}
		on:finalize={handleDndFinalizeColumns}
	>
		{#each lists as list (list.id)}
			<div class="column" animate:flip={{ duration: flipDurationMs }}>
				<div class="column-title"><ListItem data={list} /></div>
				<div
					class="column-content"
					use:dndzone={{ items: list.cards, flipDurationMs }}
					on:consider={(e) => handleDndConsiderCards(list.id, e)}
					on:finalize={(e) => handleDndFinalizeCards(list.id, e)}
				>
					{#each list.cards as item (item.id)}
						<div class="card" animate:flip={{ duration: flipDurationMs }} on:click={handleClick}>
							{item.title}
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</section>
	<li class="h-full w-[272px] shrink-0 select-none list-none">
		{#if $page.data.isBoardMember?.role === 'Owner' || $page.data.isBoardMember?.role === 'Coworker'}
			<ListForm />
		{/if}
	</li>
</ol>

<style>
	.board {
		height: 90vh;
		width: 100%;
		padding: 0.5em;
		margin-bottom: 40px;
	}
	.column {
		height: 100%;
		width: 250px;
		padding: 0.5em;
		margin: 1em;
		float: left;
		border: 1px solid #333333;
		/*Notice we make sure this container doesn't scroll so that the title stays on top and the dndzone inside is scrollable*/
		overflow-y: hidden;
	}
	.column-content {
		height: 100%;
		/* Notice that the scroll container needs to be the dndzone if you want dragging near the edge to trigger scrolling */
		overflow-y: scroll;
	}
	.column-title {
		margin-bottom: 1em;
		display: flex;
		justify-content: center;
		align-items: center;
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
