import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';
import { error as svelteError } from '@sveltejs/kit';

export const client = createClient(
	env.PUBLIC_SUPABASE_URL,
	env.PUBLIC_SUPABASE_ANON_KEY,
);

// function toPascalCase(str: string): string {
// 	return str.replace(/(\w)(\w*)/g, (_, g1, g2) => {
// 		return g1.toUpperCase() + g2.toLowerCase();
// 	});
// }

const formatData = data =>
	data.map(row => {
		row.inserted_at = new Date(row.inserted_at);
		row.updated_at = new Date(row.updated_at);
		return row;
	});

export const getPost = async table => {
	try {
		const { data, error, status } = await client.from(table).select('*');

		if (error && status !== 406) {
			console.log('# Database error\n', error, status);
			throw svelteError(500, `Database error: ${error.message}`);
		}

		if (data) {
			formatData(data);
			return data;
		}
	} catch (error) {
		console.log('# Error: database error\n', error);
		throw svelteError(
			500,
			`Database error ${error.status}: ${error.body.message}`,
		);
	}
};
