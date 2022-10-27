interface FilterOption {
	text: string;
	checked: boolean;
}

interface Filter {
	id: string;
	name: string;
	type: string;
	list: FilterOption[];
}

export const filters: Filter[] = [
	{
		id: "days",
		name: "Days...",
		type: "checkbox",
		list: [
			{text: "Monday", checked: true},
			{text: "Tuesday", checked: true},
			{text: "Wednesday", checked: true},
			{text: "Thursday", checked: true},
			{text: "Friday", checked: true},
			{text: "Saturday", checked: false},
			{text: "Sunday", checked: false}
		]
	},
	{
		id: "time",
		name: "Time...",
		type: "checkbox",
		list: [
			{text: "Morning", checked: true},
			{text: "Afternoon", checked: true}
		]
	},
	{
		id: "salary",
		name: "Salary...",
		type: "radio",
		list: [
			{text: "Payed", checked: false},
			{text: "Volunteer", checked: false},
		]
	}
];
