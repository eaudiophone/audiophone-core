class TermsModels {
	
	constructor( 
		apiaudiophoneterms_quantityeventsweekly,
		apiaudiophoneterms_quantityeventsmonthly,
		apiaudiophoneterms_rankevents,
		apiaudiophoneterms_daysevents,
		apiaudiophoneterms_begintime,
		apiaudiophoneterms_finaltime
	) {
		this.apiaudiophoneterms_quantityeventsweekly = apiaudiophoneterms_quantityeventsweekly || 1;
		this.apiaudiophoneterms_quantityeventsmonthly = apiaudiophoneterms_quantityeventsmonthly || 1;
		this.apiaudiophoneterms_rankevents = apiaudiophoneterms_rankevents || '';
		this.apiaudiophoneterms_finaltime = apiaudiophoneterms_finaltime || '17:00';
		this.apiaudiophoneterms_begintime = apiaudiophoneterms_begintime || '09:00';
		this.apiaudiophoneterms_daysevents = apiaudiophoneterms_daysevents || [];
	}
}

export default TermsModels;