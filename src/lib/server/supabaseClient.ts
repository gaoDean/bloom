import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';
import { error as svelteError } from '@sveltejs/kit';
import { promises as fsPromises, exists as pathExists, readFile } from 'fs';

export const client = createClient(
	env.PUBLIC_SUPABASE_URL,
	env.PUBLIC_SUPABASE_ANON_KEY,
);

// function toPascalCase(str: string): string {
// 	return str.replace(/(\w)(\w*)/g, (_, g1, g2) => {
// 		return g1.toUpperCase() + g2.toLowerCase();
// 	});
// }

function formatData(data: any) {
	Object.values(data).forEach((row) => {
		row.inserted_at = new Date(row.inserted_at);
	});
}

async function writeTableTypes(tableName: string, data: any) {
	if (!tableName || !data) {
		return;
	}
	let buffer: string = 'export interface Job {\n';
	Object.entries(data[0]).forEach(([key, value]) => {
		buffer += `\t${key}: ${typeof value};\n`;
	});
	buffer += '}\n';
	try {
		const typesFilePath = `src/lib/dbJobTypes.ts`;
		pathExists(typesFilePath, async (exists) => {
			if (exists) {
				if ((await fsPromises.readFile(typesFilePath)) != buffer) {
					fsPromises.writeFile(typesFilePath, buffer);
				}
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
			formatData(data);
			// generates code for typescript interfaces
			writeTableTypes(table, data);

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
