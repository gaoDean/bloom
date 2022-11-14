import { type Job } from '$lib/dbJobTypes.js';

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
		checker: (days: string, activeChecks: string[]) =>
			activeChecks.some((check: string) => new RegExp(check).test(days)),
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
		checker: (salary: number, activeChecks: string[]) =>
			activeChecks.some((check: string) => {
				if (salary > 0 && check === 'Payed') {
					return true;
				}
				if (salary === 0 && check === 'Volunteer') {
					return true;
				}
				return false;
			}),
	},
];

function applyFilter(job: Job, filter: Filter): boolean {
	const field: unknown = job[filter.id];
	const checksBuffer: string[] = [];
	filter.list.forEach((check: object) => {
		if (check.checked) {
			checksBuffer.push(check.text);
		}
	});
	return checksBuffer ? filter.checker(field, checksBuffer) : false;
}

export function passesFilters(job: Job, runtimeFilters: Filter[]): boolean {
	return runtimeFilters.every((filter: Filter) => applyFilter(job, filter));
}

export function deepClone(filterArray: Filter[]): Filter[] {
	return JSON.parse(JSON.stringify(filterArray)) as Filter[];
}
