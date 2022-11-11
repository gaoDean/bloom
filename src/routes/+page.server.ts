import * as db from '$lib/server/supabaseClient.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		post: await db.getPost('jobs'),
	};
}

export const prerender = true;
export const ssr = true;
