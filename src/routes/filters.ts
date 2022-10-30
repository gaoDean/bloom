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

export const defaultFilters: Filter[] = [
	{
		id: 'days',
		name: 'Days...',
		type: 'checkbox',
		class: 'filter-days',
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
		name: 'Time...',
		type: 'checkbox',
		class: 'filter-time',
		list: [
			{ text: 'Morning', checked: true },
			{ text: 'Afternoon', checked: true },
		],
	},
	{
		id: 'salary',
		name: 'Salary...',
		type: 'checkbox',
		class: 'filter-salary',
		list: [
			{ text: 'Payed', checked: true },
			{ text: 'Volunteer', checked: false },
		],
	},
];

export function deepClone(filters: Filter[]): Filter[] {
	const clone: Filter[] = JSON.parse(JSON.stringify(filters)) as Filter[];
	return clone;
}
