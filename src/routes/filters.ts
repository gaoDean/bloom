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
			for (let checkIndex = 0; checkIndex < activeChecks.length; ++checkIndex) {
				if (new RegExp(activeChecks[checkIndex]).test(field)) {
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
			for (let checkIndex = 0; checkIndex < activeChecks.length; ++checkIndex) {
				if (field > 0 && activeChecks[checkIndex] === 'Payed') {
					return true;
				} if (field === 0 && activeChecks[checkIndex] === 'Volunteer') {
					return true;
				}
			}
			return false;
		},
	},
];

function applyFilter(job: Job, filter: Filter): boolean {
	const field: unknown = job[filter.id];
	const checksBuffer: string[] = [];
	for (let checkIndex = 0; checkIndex < filter.list.length; ++checkIndex) {
		if (filter.list[checkIndex].checked) {
			checksBuffer.push(filter.list[checkIndex].text);
		}
	}
	if (!checksBuffer) {
		return false;
	}
	return filter.checker(field, checksBuffer);
}

export function passesFilters(job: Job, runtimeFilters: Filter[]): boolean {
	for (let filterIndex = 0; filterIndex < runtimeFilters.length; ++filterIndex) {
		if (!applyFilter(job, runtimeFilters[filterIndex])) {
			return false;
		}
	}
	return true;
}

export function deepClone(filterArray: Filter[]): Filter[] {
	return JSON.parse(JSON.stringify(filterArray)) as Filter[];
}
