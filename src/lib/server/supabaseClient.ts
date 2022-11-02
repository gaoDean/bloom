import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';
import { error as svelteError } from '@sveltejs/kit';
import { promises as fsPromises, exists as pathExists } from 'fs';

export const client = createClient(
	env.PUBLIC_SUPABASE_URL,
	env.PUBLIC_SUPABASE_ANON_KEY,
);

function toPascalCase(str: string): string {
	return str.replace(/(\w)(\w*)/g, (g0, g1, g2) => {
		return g1.toUpperCase() + g2.toLowerCase();
	});
}

async function writeTableTypes(tableName: string, data) {
	if (!tableName || !data) {
		return;
	}
	const pcaseName = toPascalCase(tableName);
	let buffer: string = 'export interface Row {\n';
	Object.entries(data[0]).forEach(([key, value]) => {
		buffer += `\t${key}: ${typeof value};\n`;
	});
	buffer += '}\n\n';
	buffer += `export type ${pcaseName} = Row[];`;
	try {
		const typesFilePath = `src/lib/server/db${pcaseName}.types.ts`;
		pathExists(typesFilePath, exists => {
			if (exists) {
				fsPromises.writeFile(typesFilePath, buffer, {
					flag: 'w',
				});
			}
		});
	} catch (err) {
		const svelteError = {
			status: 500,
			body: {
				message: err,
			},
		};
		throw svelteError;
	}
}

export async function getPost(table: string) {
	try {
		const { data, error, status } = await client.from(table).select('*');

		if (error && status !== 406) {
			console.log('# Database error\n', error, status);
			throw svelteError(500, `Database error: ${error.message}`);
		}

		if (data) {
			// generates code for typescript interfaces
			await writeTableTypes(table, data);

			return data;
		}
	} catch (error) {
		console.log('# Error: database error\n', error);
		throw svelteError(
			500,
			`Database error ${error.status}: ${error.body.message}`,
		);
	}
}
