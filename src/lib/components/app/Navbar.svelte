<script lang="ts">
	import Logo from '$lib/components/app/Logo.svelte';
</script>

<div class="fixed top-0 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
	<div class="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
		<Logo />
		<div class="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
			<button
				class="cursor-not-allowed rounded-md border-2 border-gray-400 px-3 py-1 font-bold text-black"
				disabled
			>
				Login
			</button>
			<button
				class="cursor-not-allowed rounded-md bg-black px-3 py-[6px] font-bold text-white"
				disabled
			>
				Get Taskify for free
			</button>
		</div>
	</div>
</div>
