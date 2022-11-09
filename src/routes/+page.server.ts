import * as db from '$lib/server/supabaseClient.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	return {
		post: await db.getPost('jobs'),
	};
}
