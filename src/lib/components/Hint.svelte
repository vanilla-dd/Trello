<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Button } from '$lib/components/ui/button';
	import { HelpCircle } from 'lucide-svelte';
</script>

<Tooltip.Root closeDelay={700} openDelay={300} positioning={{ placement: 'bottom-end' }}>
	<Tooltip.Trigger let:builder>
		<Button builders={[builder]} class="p-0 h-[14px] w-[14px]">
			<HelpCircle />
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content class="text-xs max-w-[220px] break-words">
		<p>Free workspace can have up to 5 free board.Upgrade your subscription to have more boards.</p>
	</Tooltip.Content>
</Tooltip.Root>
