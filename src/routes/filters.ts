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
	},
];

function applyFilter(
	job: Job,
	filter: Filter,
	valType: string,
	cmpFunc: (val: any, checks: string[]) => boolean,
) {
	const val = job[filter.id];
	if (typeof val !== valType) {
		return false;
	}
	let checksBuffer: string[] = [];
	for (const check of filter.list) {
		if (check.checked) {
			checksBuffer.push(check);
		}
	}
	if (!checksBuffer) {
		return false;
	}
	return cmpFunc(val, checksBuffer);
}

export function passesFilters(job: Job, newFilters: Filter[]): boolean {
	for (const filter of newFilters) {
		let cmpFunc: (val: any, checks: string[]) => boolean;
		let valType: string;
		if ((newFilters.id = 'days')) {
			valType = 'string';
			cmpFunc = (days: string, checks: string[]) => {
				for (const check of checks) {
					if (new RegExp(check).test(days)) {
						return true;
					}
				}
				return false;
			};
		} else if ((newFilters.id = 'salary')) {
			valType = 'number';
			cmpFunc = (salary: number, checks: string[]) => {
				for (const check of checks) {
					if (salary > 0 && check === 'Payed') {
						return true;
					}	else if (salary === 0 && check === 'Volunteer') {
						return true;
					}
				}
				return false;
			};
		}
		if (applyFilter(job, filter, valType, cmpFunc)) {
			return true;
		}
	}
	return false;
}

export function deepClone(filterArray: Filter[]): Filter[] {
	return JSON.parse(JSON.stringify(filterArray)) as Filter[];
}
