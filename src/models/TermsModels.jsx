class TermsModels {
	
	constructor( 
		quantityMeetingWeekly, 
		quantityMeetingMonthly, 
		daysMeeting,
		finalHour,
		beginTime,
		daysWeek
		) {
		this.quantityMeetingWeekly = quantityMeetingWeekly || 1;
		this.quantityMeetingMonthly = quantityMeetingMonthly || 1;
		this.daysMeeting = daysMeeting || '';
		this.finalHour = finalHour || '';
		this.beginTime = beginTime || '';
		this.daysWeek = daysWeek || [];
	}
}

export default TermsModels;