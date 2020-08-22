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
		this.finalHour = finalHour || '17:00';
		this.beginTime = beginTime || '09:00';
		this.daysWeek = daysWeek || [];
	}
}

export default TermsModels;