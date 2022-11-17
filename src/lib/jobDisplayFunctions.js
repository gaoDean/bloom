export const listToArray = list =>
	list.split(/\r?\n/).filter(element => element);

export const formatTime = hms => {
	const time = hms.split(':');
	const d = new Date();
	d.setHours(time[0]);
	d.setMinutes(time[1]);
	d.setSeconds(time[2]);
	return d.toLocaleTimeString('en-US');
};
