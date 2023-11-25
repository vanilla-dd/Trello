<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Plus } from 'radix-icons-svelte';
	import { Popover, PopoverTrigger, PopoverContent } from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { listCreateSchema, type ListCreateType } from '$lib/schema/formValidators';
	import type { SuperValidated } from 'sveltekit-superforms';
	import toast from 'svelte-french-toast';
	import { Loader2 } from 'lucide-svelte';
	export let form: SuperValidated<ListCreateType>;
	let popOver: boolean;
</script>

<Popover closeOnOutsideClick={true} bind:open={popOver}>
	<PopoverTrigger asChild let:builder>
		<Button builders={[builder]} variant="secondary" class="flex gap-2 items-center "
			><Plus />Add a list</Button
		>
	</PopoverTrigger>
	<PopoverContent class="w-80">
		<Form.Root
			action="?/createList"
			method="POST"
			{form}
			schema={listCreateSchema}
			let:config
			let:delayed
			options={{
				validators: listCreateSchema,
				multipleSubmits: 'prevent',
				validationMethod: 'oninput',
				onResult(event) {
					console.log(event.result.type);
					event.result.type === 'success'
						? (toast.success('List Added'), (popOver = false))
						: toast.error('Failed to add List');
				}
			}}
		>
			<Form.Field {config} name="title">
				<Form.Item>
					<Form.Label>List Name</Form.Label>
					<Form.Input />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Button
				>Submit
				{#if delayed}
					<Loader2 class="animate-spin w-4 h-4" />
				{/if}
			</Form.Button>
		</Form.Root>
	</PopoverContent>
</Popover>
