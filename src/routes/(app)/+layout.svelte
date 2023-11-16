<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<div class="h-full bg-slate-100">
	<Navbar />
	<main class="bg-slate-100 pb-20 pt-40">
		<slot />
	</main>
	<Footer />
</div>
