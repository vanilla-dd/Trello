<script>
	import ListForm from '$lib/list/ListForm.svelte';
	export let data;
</script>

<!-- <p class="text-black">
	{JSON.stringify(data.isBoardMember)}
</p> -->

{#if data.isBoardMember?.role === 'Owner'}
	<form action="?/addMember" method="POST">
		<input type="text" name="id" value="clp8jhdys0000141jq6xjnmd9" />
		<select name="role" id="">
			<option value="Coworker">Coworker</option>
			<option value="Watcher">Watcher</option>
		</select>
		<button>Submit</button>
	</form>
{/if}
{#if data.isBoardMember?.role === 'Owner' || data.isBoardMember?.role === 'Coworker'}
	<ListForm form={data.form} />
{/if}
<div class="text-black">
	<div class="bg-red-300 flex gap-5 flex-col">
		{#each data.lists || [] as list}
			<br />
			{list.title}
			<div class="bg-black text-white">
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
</div>
