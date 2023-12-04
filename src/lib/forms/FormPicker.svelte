<script lang="ts">
	import { defaultImages } from '$lib/constant/images';
	import { unsplash } from '$lib/unsplash';
	import { cn } from '$lib/utils';
	import { Check, Loader2 } from 'lucide-svelte';
	let selectedImage: string;
	let images: Array<Record<string, any>> = defaultImages;
	export let pending: boolean;
	let loading = false;
	const fetchImages = async () => {
		try {
			loading = true;
			const result = await unsplash.photos.getRandom({ collectionIds: ['317099'], count: 9 });
			if (result && result.response) {
				images = result.response as Array<Record<string, any>>;
			} else {
				console.log('unpslah sucks');
			}
		} catch (error) {
			console.log('errored');
		} finally {
			loading = false;
		}
	};
	fetchImages();
</script>

{#if loading}
	<div class="flex items-center justify-center p-6">
		<Loader2 class="h-6 w-6 animate-spin text-sky-700" />
	</div>
{:else}
	<div class="relative">
		<div class="mb-2 grid grid-cols-3 gap-2">
			{#each images as image (image.id)}
				<div
					tabindex="0"
					on:keypress={(e) => {
						e.key === 'Enter' ? (selectedImage = image.id) : null;
					}}
					aria-roledescription="button"
					class={cn(
						'group relative aspect-video cursor-pointer bg-muted transition hover:opacity-75',
						pending && 'cursor-auto opacity-50 hover:opacity-50'
					)}
					on:click={() => (selectedImage = image.id)}
				>
					<input
						type="radio"
						name="imageId"
						hidden
						id={image.id}
						class="hidden"
						disabled={pending}
						checked={selectedImage === image.id}
						value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
					/>
					{#if selectedImage === image.id}
						<div
							class="absolute inset-y-0 flex h-full w-full items-center justify-center bg-black/30"
						>
							<Check class="h-4 w-4 text-white" />
						</div>
					{/if}
					<img
						src={image.urls.thumb}
						alt="Unspalsh Images"
						class="aspect-video rounded-sm object-cover"
					/>
					<a
						tabindex="-1"
						href={image.links.html}
						target="_blank"
						class="absolute bottom-0 w-full truncate bg-black/50 px-1 text-right text-[8px] opacity-0 hover:underline group-focus-within:opacity-100 group-hover:opacity-100"
					>
						{image.user.name}
					</a>
				</div>
			{/each}
		</div>
	</div>
{/if}
