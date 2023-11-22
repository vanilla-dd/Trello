<script>
	export let data;
</script>

<form action="?/addMember" method="POST">
	<input type="text" name="id" value="clp8jhdys0000141jq6xjnmd9" />
	<select name="role" id="">
		<option value="Coworker">Coworker</option>
		<option value="Watcher">Watcher</option>
	</select>
	<button>Submit</button>
</form>

<form action="?/createList" method="POST">
	<input type="text" name="listName" />
	<button>Create</button>
</form>
<form action="?/createCard" method="POST">
	<button>submit</button>
</form>

<div class="text-black">
	{JSON.stringify(data.boardData)}

	<br />
	{JSON.stringify(data.lists)}
	<br />
	<div class="bg-red-300 flex gap-5 flex-col">
		{#each data.lists as list}
			<br />
			{list.title}
			<div class="bg-black text-white">
				{#each list.cards as card}
					{card.listId}
					{card.title}
					{card.content}
				{/each}
			</div>

			<form action="?/createCard" method="POST">
				<input type="text" name="cardName" value="hi" />
				<input type="text" name="listId" value={list.id} />
				<input type="text" hidden class="hidden" name="boardId" value={list.boardId} />
				<button>Create Card</button>
			</form>
			<br />
		{/each}
	</div>
</div>
