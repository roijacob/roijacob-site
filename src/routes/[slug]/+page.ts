import { error } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';

export const prerender = true;

const posts = import.meta.glob<{ default: unknown; metadata: Record<string, unknown> }>(
	'/src/posts/*.md'
);

export const entries: EntryGenerator = () => {
	return Object.keys(posts).map((path) => ({
		slug: path.split('/').pop()!.replace('.md', '')
	}));
};

export async function load({ params }) {
	const importer = posts[`/src/posts/${params.slug}.md`];
	if (!importer) error(404, 'Post not found');

	const post = await importer();
	return {
		Content: post.default,
		meta: post.metadata
	};
}
