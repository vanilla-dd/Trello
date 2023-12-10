<script lang="ts">
	import type { Card } from '@prisma/client';

	export let card: Card;
</script>

<div
	class="truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm text-black shadow-sm hover:border-black"
>
	{card.title}
</div>
