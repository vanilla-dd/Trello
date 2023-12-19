<script lang="ts">
	import { X } from 'lucide-svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import CreateBoard from '$lib/forms/CreateBoard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { PopoverTrigger, Popover, PopoverContent } from '$lib/components/ui/popover';
	import type { BoardCreateType } from '$lib/validator/formValidators';
	export let form: SuperValidated<BoardCreateType>;
	let popOpen: boolean;
</script>

<Popover
	closeOnOutsideClick={true}
	bind:open={popOpen}
	positioning={{ placement: 'right', fitViewport: true, overlap: true }}
>
	<PopoverTrigger>
		<slot />
	</PopoverTrigger>
	<PopoverContent class="grid w-80 pt-3 ">
		<Button class="h-8 w-8 place-self-end self-end px-2 py-0" on:click={() => (popOpen = false)}
			><X class="h-4 w-4 stroke-red-500 p-0" /></Button
		>
		<CreateBoard {form} />
	</PopoverContent>
</Popover>
