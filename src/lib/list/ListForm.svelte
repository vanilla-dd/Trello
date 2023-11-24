<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Plus } from 'radix-icons-svelte';
	import { Popover, PopoverTrigger, PopoverContent } from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { listCreateSchema, type ListCreateType } from '$lib/schema/formValidators';
	import type { SuperValidated } from 'sveltekit-superforms';
	export let form: SuperValidated<ListCreateType>;
	let loading = false;
</script>

<Popover>
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
			options={{
				validators: listCreateSchema,
				onSubmit: () => {
					loading = true;
				},
				multipleSubmits: 'prevent',
				onResult(event) {
					loading = false;
					if (event.result) {
						console.log(event.result);
					}
					if (event.result.type === 'success') {
					}
				} // ...
			}}
		>
			<Form.Field {config} name="title">
				<Form.Item>
					<Form.Label>List Name</Form.Label>
					<Form.Input />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
			<Form.Button>Submit</Form.Button>
		</Form.Root>
	</PopoverContent>
</Popover>
{#if loading}
	<p class="bg-black text-white">YOOOOOOOOOOOOO......</p>
{/if}
