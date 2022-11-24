import { createClient } from '@supabase/supabase-js';
import { error as svelteError } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

const client = createClient(
	env.PUBLIC_SUPABASE_URL,
	env.PUBLIC_SUPABASE_ANON_KEY,
);

const formatData = data =>
	[...data].map(row => ({
		...row,
		inserted_at: new Date(row.inserted_at),
		updated_at: new Date(row.updated_at),
	}));

export const getPost = async table => {
	try {
		const { data, error, status } = await client.from(table).select('*');

		if (error && status !== 406) {
			throw svelteError(500, `Database error: ${error.message}`);
		}

		return data ? formatData(data) : undefined;
	} catch (error) {
		throw svelteError(
			500,
			`Database error ${error.status}: ${error.body.message}`,
		);
	}
};
