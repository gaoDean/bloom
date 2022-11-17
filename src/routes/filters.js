import { map, filter, pipe } from './functional.js';

export const filters = [
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
		checker: (days, activeChecks) =>
			activeChecks.some(check => new RegExp(check).test(days)),
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
		checker: (salary, activeChecks) =>
			activeChecks.some(check => {
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

const getChecks = filterList =>
	pipe(
		filterList,
		filter(check => check.checked),
		map(x => x.text),
	);
const applyFilter = (job, filter) =>
	getChecks(filter.list)
		? filter.checker(job[filter.id], getChecks(filter.list))
		: false;
export const passesFilters = (job, runtimeFilters) =>
	runtimeFilters.every(filter => applyFilter(job, filter));
export const deepClone = filterArray => JSON.parse(JSON.stringify(filterArray));
