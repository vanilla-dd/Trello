// Unsplash Images
import { PUBLIC_UNSPLASH_KEY } from '$env/static/public';
import { createApi } from 'unsplash-js';
export const unsplash = createApi({
	accessKey: PUBLIC_UNSPLASH_KEY,
	fetch: fetch
});
