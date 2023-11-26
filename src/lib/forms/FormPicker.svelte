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
	<div class="p-6 flex items-center justify-center">
		<Loader2 class="h-6 w-6 text-sky-700 animate-spin" />
	</div>
{:else}
	<div class="relative">
		<div class="grid grid-cols-3 mb-2 gap-2">
			{#each images as image (image.id)}
				<div
					class={cn(
						'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
						pending && 'opacity-50 hover:opacity-50 cursor-auto'
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
							class="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center"
						>
							<Check class="h-4 w-4 text-white" />
						</div>
					{/if}
					<img
						src={image.urls.thumb}
						alt="Unspalsh Images"
						class="object-cover aspect-video rounded-sm"
					/>
					<a
						href={image.links.html}
						target="_blank"
						class="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[8px] truncate text-right hover:underline px-1 bg-black/50"
					>
						{image.user.name}
					</a>
				</div>
			{/each}
		</div>
	</div>
{/if}
