import { type Job } from '$lib/dbJobsTypes.js';

interface FilterOption {
	text: string;
	checked: boolean;
}

export interface Filter {
	id: string;
	name: string;
	type: string;
	class: string;
	list: FilterOption[];
	fieldType: string;
	checker: (field: any, activeChecks: string[]) => boolean;
}

export const filters: Filter[] = [
	{
		id: 'days',
		name: 'Days',
		type: 'checkbox',
		active: 'false',
		list: [
			{ text: 'Monday', checked: true },
			{ text: 'Tuesday', checked: true },
			{ text: 'Wednesday', checked: true },
			{ text: 'Thursday', checked: true },
			{ text: 'Friday', checked: true },
			{ text: 'Saturday', checked: true },
			{ text: 'Sunday', checked: true },
		],
		checker: (field: string, activeChecks: string[]) => {
			for (const check of activeChecks) {
				if (new RegExp(check).test(field)) {
					return true;
				}
			}
			return false;
		},
	},
	{
		id: 'time',
		name: 'Time',
		type: 'checkbox',
		active: 'false',
		list: [
			{ text: 'Morning', checked: true },
			{ text: 'Afternoon', checked: true },
		],
		checker: () => true,
	},
	{
		id: 'salary',
		name: 'Salary',
		type: 'checkbox',
		active: 'false',
		list: [
			{ text: 'Payed', checked: true },
			{ text: 'Volunteer', checked: false },
		],
		checker: (field: number, activeChecks: string[]) => {
			for (const check of activeChecks) {
				if (field > 0 && check === 'Payed') {
					return true;
				}	else if (field === 0 && check === 'Volunteer') {
					return true;
				}
			}
			return false;
		},
	},
];

function applyFilter(
	job: Job,
	filter: Filter,
): boolean {
	const field: unknown = job[filter.id];
	let checksBuffer: string[] = [];
	for (const check of filter.list) {
		if (check.checked) {
			checksBuffer.push(check.text);
		}
	}
	if (!checksBuffer) {
		return false;
	}
	return filter.checker(field, checksBuffer);
}

export function passesFilters(job: Job, newFilters: Filter[]): boolean {
	for (const filter of newFilters) {
		if (!applyFilter(job, filter)) {
			return false;
		}
	}
	return true;
}

export function deepClone(filterArray: Filter[]): Filter[] {
	return JSON.parse(JSON.stringify(filterArray)) as Filter[];
}
