<script lang="ts">
	import { page } from '$app/stores';
	import { Toaster } from 'svelte-french-toast';
	import Footer from '$lib/components/app/Footer.svelte';
	import Navbar from '$lib/components/app/Navbar.svelte';
	import AppNavbar from '$lib/components/app/AppNavbar.svelte';
</script>

<Toaster />
<div class="h-[100dvh] bg-slate-100">
	{#if $page.data.session?.user}
		<AppNavbar />
	{:else}
		<Navbar />
		<Footer />
	{/if}
	<main class="bg-slate-100">
		<slot />
	</main>
</div>
