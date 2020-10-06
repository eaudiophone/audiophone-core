class Event {

	constructor(
			apiaudiophonevents_id,
			apiaudiophonevents_title,
			apiaudiophonevents_date,
			apiaudiophonevents_begintime,
			apiaudiophonevents_finaltime,
			apiaudiophonevents_totalhours,
			apiaudiophonevents_description,
			apiaudiophonevents_address,
			id_apiaudiophoneservices
		) {

		this.apiaudiophonevents_id = apiaudiophonevents_id || null;
		this.apiaudiophonevents_title = apiaudiophonevents_title || '';
		this.apiaudiophonevents_date = apiaudiophonevents_date || '';
		this.apiaudiophonevents_begintime = apiaudiophonevents_begintime || '';
		this.apiaudiophonevents_finaltime = apiaudiophonevents_finaltime || '';
		this.apiaudiophonevents_totalhours = apiaudiophonevents_totalhours || '';
		this.apiaudiophonevents_address = apiaudiophonevents_address || '';
		this.apiaudiophonevents_description = apiaudiophonevents_description || '';
		this.id_apiaudiophoneservices = id_apiaudiophoneservices || '';
	}
};

export default Event;