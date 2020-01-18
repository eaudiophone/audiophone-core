class Event {

	constructor(
			title,
			date,
			startingTime,
			finalHour,
			totalHours,
			description,
			addressMeeting
		) {

		this.title = title || '';
		this.date = date || '';
		this.startingTime = startingTime || '';
		this.finalHour = finalHour || '';
		this.totalHours = totalHours || '';
		this.description = description || '';
		this.addressMeeting = addressMeeting || '';
	}
};

export default Event;