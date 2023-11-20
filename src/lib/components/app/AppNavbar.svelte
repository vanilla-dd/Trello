<script lang="ts">
import { Plus } from 'lucide-svelte';
import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
import Logo from '../Logo.svelte';
import { page } from '$app/stores';
</script>

<nav class="fixed top-0 z-50 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
	<div class="flex items-center gap-x-4">
		<div class="hidden md:flex">
			<Logo />
		</div>
		<button class=" hidden h-auto rounded-sm bg-black px-4 py-2 text-xs text-white md:block"
			>Create</button
		>
		<button class="text-xm block rounded-sm bg-black px-3 text-white md:hidden"
			><Plus class="h-4 w-4" /></button
		>
	</div>
	<div class="ml-auto flex items-center gap-x-2 border border-green-400">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<img class="h-8 w-8" src={$page.data.session?.user?.image} alt="Pfp" />
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Label>My Account</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>
						<a href="/me"> Profile </a>
					</DropdownMenu.Item>
					<DropdownMenu.Item>Subscription</DropdownMenu.Item>
					<DropdownMenu.Item>Log Out</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</nav>
