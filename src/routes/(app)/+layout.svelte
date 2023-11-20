<script lang="ts">
	import { page } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import AppNavbar from '$lib/components/app/AppNavbar.svelte';
</script>

<div class="h-[100dvh] bg-slate-100">
	{#if $page.data.session?.user}
		<AppNavbar />
	{:else}
		<Navbar />
		<Footer />
	{/if}
	<main class="bg-slate-100 pb-20 pt-40">
		<slot />
	</main>
</div>
