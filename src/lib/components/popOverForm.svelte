<script lang="ts">
	import CreateBoard from '$lib/forms/CreateBoard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { PopoverTrigger, Popover, PopoverContent } from '$lib/components/ui/popover';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { BoardCreateType } from '$lib/schema/formValidators';
	import { X } from 'lucide-svelte';
	let popOpen: boolean;
	export let form: SuperValidated<BoardCreateType>;
</script>

<Popover
	closeOnOutsideClick={true}
	bind:open={popOpen}
	positioning={{ placement: 'right', fitViewport: true, overlap: true }}
>
	<PopoverTrigger>
		<slot />
	</PopoverTrigger>
	<PopoverContent class="w-80 pt-3 grid ">
		<Button class="self-end place-self-end px-2 py-0 h-8 w-8" on:click={() => (popOpen = false)}
			><X class="stroke-red-500 w-4 h-4 p-0" /></Button
		>
		<CreateBoard {form} />
	</PopoverContent>
</Popover>
