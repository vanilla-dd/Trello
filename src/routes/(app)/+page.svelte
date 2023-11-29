<script lang="ts">
	import { Medal } from 'lucide-svelte';
	import { signIn, signOut } from '@auth/sveltekit/client';
</script>

<svelte:head>
	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://trello-omega-clone.vercel.app/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Trello" />
	<meta property="og:description" content="A Simple Trello Clone" />
	<meta property="og:image" content="https://trello-omega-clone.vercel.app/logo.png" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="trello-omega-clone.vercel.app" />
	<meta property="twitter:url" content="https://trello-omega-clone.vercel.app/" />
	<meta name="twitter:title" content="Trello" />
	<meta name="twitter:description" content="A Simple Trello Clone" />
	<meta name="twitter:image" content="https://trello-omega-clone.vercel.app/logo.png" />

	<title>Taskify</title>
	<meta name="description" content="A Simple Trello Clone" />
	<meta property="og:title" content="Trello" />
	<meta property="og:description" content="A Simple Trello Clone" />
	<meta property="og:image" content="https://trello-omega-clone.vercel.app/logo.png" />
</svelte:head>

<div class="flex flex-col items-center justify-center pt-20">
	<button
		on:click={() => {
			signIn();
		}}>ehlo</button
	>
	<div class="flex flex-col items-center justify-center">
		<div
			class="mb-4 flex items-center rounded-full border bg-amber-100 p-4 uppercase text-amber-700 shadow-sm"
		>
			<Medal class="mr-2 h-6 w-6" />
			No 1 task managment
		</div>
		<h1 class="mb-6 text-clip text-3xl text-neutral-800 md:text-6xl">Taskify help team move</h1>
		<div
			class="w-fit rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 p-2 px-4 text-3xl text-white md:text-6xl"
		>
			work forward.
		</div>
	</div>
	<div class="mx-auto mt-4 max-w-xs text-center text-sm text-neutral-400 md:max-w-2xl md:text-xl">
		Colaborate, manage projects, and reach new productivity peaks. From high rises to the home
		office, the way your team works is unique - accomplish it all with Taskify.
	</div>
	<a href="/login" class="mt-6 rounded-md bg-black px-3 py-2 text-white"> Get Taskify for free </a>
</div>
