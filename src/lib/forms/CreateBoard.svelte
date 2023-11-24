<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { boardCreateSchema, type BoardCreateType } from '$lib/schema/formValidators';
	import type { SuperValidated } from 'sveltekit-superforms';
	export let form: SuperValidated<BoardCreateType>;
</script>

<Form.Root method="POST" {form} schema={boardCreateSchema} let:config>
	<Form.Field {config} name="title">
		<Form.Item>
			<Form.Label>Board Title</Form.Label>
			<Form.Input />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="visibility">
		<Form.Item>
			<Form.Label class="flex gap-1"
				>Visibility <small class="text-[8px] text-red-700">* Public by default</small></Form.Label
			>
			<Form.Select>
				<Form.SelectTrigger placeholder="Select Board Visibility" />
				<Form.SelectContent>
					<Form.SelectItem value="public">Public</Form.SelectItem>
					<Form.SelectItem value="private">Private</Form.SelectItem>
				</Form.SelectContent>
			</Form.Select>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</Form.Root>
