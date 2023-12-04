<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { boardCreateSchema, type BoardCreateType } from '$lib/schema/formValidators';
	import { Loader2 } from 'lucide-svelte';
	import toast from 'svelte-french-toast';
	import type { SuperValidated } from 'sveltekit-superforms';
	import FormPicker from './FormPicker.svelte';
	export let form: SuperValidated<BoardCreateType>;
</script>

<Form.Root
	method="POST"
	{form}
	schema={boardCreateSchema}
	let:config
	let:delayed
	options={{
		validators: boardCreateSchema,
		multipleSubmits: 'prevent',
		validationMethod: 'oninput',
		onResult(event) {
			event.result.type === 'success' || event.result.type === 'redirect'
				? toast.success('Board Created')
				: event.result.form
				  ? Object.entries(event.result.data.form.errors).forEach(([key, value]) => {
							toast.error(value[0]);
				    })
				  : toast.error('Cannot create Board');
			console.log(event.result);
		}
	}}
>
	<div class="pb-4 text-center text-sm font-medium text-neutral-400">Create Board</div>
	<FormPicker pending={delayed} />
	<Form.Field {config} name="title">
		<Form.Item>
			<Form.Label>Board Title</Form.Label>
			<Form.Input disabled={delayed} />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="visibility">
		<Form.Item>
			<Form.Label class="flex gap-1"
				>Visibility <small class="text-[8px] text-red-700">* Public by default</small></Form.Label
			>
			<Form.Select disabled={delayed}>
				<Form.SelectTrigger placeholder="Select Board Visibility" />
				<Form.SelectContent>
					<Form.SelectItem value="public">Public</Form.SelectItem>
					<Form.SelectItem value="private">Private</Form.SelectItem>
				</Form.SelectContent>
			</Form.Select>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Button disabled={delayed} class="flex items-center justify-center gap-2 font-bold"
		>Create
		{#if delayed}
			<Loader2 class="h-4 w-4 animate-spin" />
		{/if}
	</Form.Button>
</Form.Root>
