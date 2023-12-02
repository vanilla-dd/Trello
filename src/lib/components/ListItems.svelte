<script lang="ts">
	import { page } from '$app/stores';
	import ListForm from '$lib/list/ListForm.svelte';
	import type { List } from '@prisma/client';
	import ListItem from './ListItem.svelte';
	export let lists: List[];
</script>

<ol class="flex gap-x-3 h-full">
	{#each lists as list}
		<ListItem data={list} />
	{/each}
	<li class="shrink-0 h-full w-[272px] select-none list-none">
		{#if $page.data.isBoardMember?.role === 'Owner' || $page.data.isBoardMember?.role === 'Coworker'}
			<ListForm />
		{/if}
	</li>
</ol>
