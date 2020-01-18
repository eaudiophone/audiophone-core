class Event {

	constructor(
			title,
			date,
			startingTime,
			finalHour,
			totalHours,
			addressMeeting,
			description,
			idService,
		) {

		this.title = title || '';
		this.date = date || '';
		this.startingTime = startingTime || '';
		this.finalHour = finalHour || '';
		this.totalHours = totalHours || '';
		this.addressMeeting = addressMeeting || '';
		this.description = description || '';
		this.idService = idService || 1;
	}
};

export default Event;