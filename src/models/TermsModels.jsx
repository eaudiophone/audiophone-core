class TermsModels {
	
	constructor( 
		quantityMeetingWeekly, 
		quantityMeetingMonthly, 
		daysMeeting,
		finalHour,
		beginTime
		) {
		this.quantityMeetingWeekly = quantityMeetingWeekly || 1;
		this.quantityMeetingMonthly = quantityMeetingMonthly || 1;
		this.daysMeeting = daysMeeting || '';
		this.finalHour = finalHour || '';
		this.beginTime = beginTime || '';
	}
}

export default TermsModels;