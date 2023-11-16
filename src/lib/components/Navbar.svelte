<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
</script>

<div class="fixed top-0 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
	<div class="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
		<Logo />
		<div class="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
			<a class="btn rounded-md py-[6px] text-sm font-thin outline outline-gray-400" href="/login">
				Login
			</a>
			<a class="btn rounded-md bg-black text-sm font-thin text-white" href="/sign-up">
				Get Taskify for free
			</a>
		</div>
	</div>
</div>
