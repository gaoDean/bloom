export function listToArray(list: string): string[] {
	return list.split(/\r?\n/).filter(element => element);
}

export function formatTime(hms: string): string {
	const time: number[] = hms.split(':') as number[];
	const d = new Date();
	d.setHours(time[0]);
	d.setMinutes(time[1]);
	d.setSeconds(time[2]);
	return d.toLocaleTimeString('en-US');
}
