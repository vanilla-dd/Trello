<script lang="ts">
import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
import Logo from '../Logo.svelte';
import { page } from '$app/stores';
</script>

<nav class="fixed top-0 z-50 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
	<Logo />
	<div class="ml-auto flex items-center gap-x-2 border border-green-400">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<img class="h-8 w-8" src={$page.data.session?.user?.image} alt="Pfp" />
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Label>
						<p class="text-lg">
							u/{$page.data.session?.user?.name}
						</p>
						<p class="text-xs">
							{$page.data.session?.user?.email}
						</p>
					</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>
						<a href="/me"> Profile </a>
					</DropdownMenu.Item>
					<DropdownMenu.Item>Subscription</DropdownMenu.Item>
					<DropdownMenu.Item>Create Board</DropdownMenu.Item>
					<DropdownMenu.Item>Log Out</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</nav>
