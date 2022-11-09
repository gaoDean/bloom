export interface Row {
	id: number;
	inserted_at: string;
	name: string;
	job: string;
	location: string;
	from: string;
	to: string;
	days: string;
	salary: number;
	description: string;
	short: string;
}

export type Jobs = Row[];
