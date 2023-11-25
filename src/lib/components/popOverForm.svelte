<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import CreateBoard from '$lib/forms/CreateBoard.svelte';
	import { PopoverTrigger, Popover, PopoverContent } from '$lib/components/ui/popover';
	import { Plus } from 'lucide-svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { BoardCreateType } from '$lib/schema/formValidators';
	let popOpen: boolean;
	export let form: SuperValidated<BoardCreateType>;
</script>

<Popover closeOnOutsideClick={true} bind:open={popOpen} positioning={{ placement: 'right' }}>
	<PopoverTrigger>
		<slot />
	</PopoverTrigger>
	<PopoverContent class="w-80 pt-3">
		<CreateBoard {form} />
	</PopoverContent>
</Popover>
