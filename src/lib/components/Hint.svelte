<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Button } from '$lib/components/ui/button';
	import { HelpCircle } from 'lucide-svelte';
</script>

<Tooltip.Root closeDelay={700} openDelay={300} positioning={{ placement: 'bottom-end' }}>
	<Tooltip.Trigger let:builder>
		<Button builders={[builder]} class="h-[14px] w-[14px] p-0">
			<HelpCircle />
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content class="max-w-[220px] break-words text-xs">
		<p>Free workspace can have up to 5 free board.Upgrade your subscription to have more boards.</p>
	</Tooltip.Content>
</Tooltip.Root>
