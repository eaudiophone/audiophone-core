import { AuthService } from './AuthService';
import { 
	getDifferenceHours, 
	verifyRangeHours, 
	getHour, 
	hourToObject,
	getSpanishFormatDate,
	getDateWithHour
} from './../util-functions/date-format';
import { sliceString, toCapitalize } from './../util-functions/string-format';

export class EventService {

	authService = new AuthService();

	registerEvent( event ) {

		return new Promise(( resolve, reject ) => {
			
			const id = this.authService.getLogged().id;

			this.authService.postClient( `apiaudiophonevent/store/${ id }`, event )
				.then( resp => {
					resolve({
						action: 'Exito',
						message: resp.data.apiaudiophoneventmessage
					});
				})
				.catch( error => {
					reject( this.authService.validateExceptionServer( error ));
				})
		});
	}

	getEvent( idEvent = 1, readOnly =  false ) {

		return new Promise(( resolve, reject ) => {
			
			const id = this.authService.getLogged().id;

			this.authService.postClient(`apiaudiophonevent/show/${ id }`)
				.then(({ data }) => {
					
					let event = data.apiaudiophoneventdata.find( event => idEvent === event.apiaudiophonevents_id );

					event = {
						...event,
						apiaudiophonevents_begintime: getHour( event.apiaudiophonevents_begintime ),
						apiaudiophonevents_finaltime: getHour( event.apiaudiophonevents_finaltime ),
						apiaudiophonevents_totalhours: getHour( event.apiaudiophonevents_totalhours ),
						id_apiaudiophoneservices: event.id_apiaudiophoneservices.toString(),
						readOnly
					};

					resolve( event ); 
				})
				.catch( error => reject( this.authService.validateExceptionServer( error ) ) )
		});
	}

	getAllEvents( isUser = false ) {

		return new Promise(( resolve, reject ) => {
			
			const id = this.authService.getLogged().id;

			this.authService.postClient(`apiaudiophonevent/show/${ id }`)
				.then(({ data }) => {

					let events = data.apiaudiophoneventdata || [];

					if ( events.length > 0 && isUser ) {

						events = events.map(( event ) => ({
							id: event.apiaudiophonevents_id,
							icon: event.id_apiaudiophoneservices > 1 ? 'microphone' : 'truck',
							title: event.apiaudiophonevents_title.length > 20 ? 
								sliceString( event.apiaudiophonevents_title, 20 ) : event.apiaudiophonevents_title,
							date: getSpanishFormatDate( event.apiaudiophonevents_date ),
							startingTime: getHour( event.apiaudiophonevents_begintime ),
							finalHour: getHour( event.apiaudiophonevents_finaltime ),
							totalHours: hourToObject( event.apiaudiophonevents_totalhours ),
							description: event.apiaudiophonevents_description,
							addressMeeting: event.apiaudiophonevents_address.length > 50 ? 
								sliceString( event.apiaudiophonevents_address, 50 ) : event.apiaudiophonevents_address,
							idService: event.id_apiaudiophoneservices,
							status: event.apiaudiophonevents_status.length > 0 ? toCapitalize( event.apiaudiophonevents_status ) 
								: 'Ingresado' 
						}));
					} 
					
					return resolve( events );

				})
				.catch( error => reject( this.authService.validateExceptionServer( error ) ) );
		});
	}

	getAllEventsCalendar() {  // calendar admin

		return new Promise(( resolve, reject ) => {
			
			const id = this.authService.getLogged().id;

			this.authService.postClient(`apiaudiophonevent/show/${ id }`)
				.then(({ data }) => {

					let events = data.apiaudiophoneventdata || [];

					// mapeo de parsing https://fullcalendar.io/docs/event-parsing

					events = events.map(( event ) => ({
						id: event.apiaudiophonevents_id,
						title: event.apiaudiophonevents_title,
						start: `${ event.apiaudiophonevents_date }T${ getHour( event.apiaudiophonevents_begintime, 8 ) }`,
						end: `${ event.apiaudiophonevents_date }T${ getHour( event.apiaudiophonevents_finaltime, 8 ) }`,
						color: event.id_apiaudiophoneservices > 1 ? '#fbf096' : '#c7e5ec',
						textColor: 'black',
						extendedProps: this.parseDataEvent( event )
					}));

					return resolve( events );
				})
				.catch( error => reject( this.authService.validateExceptionServer( error ) ));
		});
	}

	getTerms() {

		return new Promise(( resolve, reject ) => {
			
			const id = this.authService.getLogged().id;

			this.authService.getClient(`apiaudiophonevent/create/${ id }`)
				.then( ({ data }) => resolve({ 
					idTermsRental: data.apiaudiophoneterm_id_uno,
					idTermsRecord: data.apiaudiophoneterm_id_dos 
				}))
				.catch( error => reject( this.authService.validateExceptionServer( error )) );
		});
	}

	updateEvent( event ) {

		return new Promise(( resolve, reject ) => {
			const id = this.authService.getLogged().id;

			this.authService.putClient(`apiaudiophonevent/update/${ id }`, event )
				.then(({ data }) => resolve({
							message: data.apiaudiophoneventmessage,
							action: 'Exito'
						})
					)
				.catch( error => reject( this.authService.validateExceptionServer( error ) ) )
		});
	}

	verifyRangeHours( start = '00:00', end = '00:00' ) {
		return verifyRangeHours( start, end );
	}

	getDifferenceHours( start = '00:00', end = '00:00' ) {
		return getDifferenceHours( start, end );
	}

	parseDataEvent( event = {} ) {
		return {
			...event,
			apiaudiophonevents_begintime: getHour( event.apiaudiophonevents_begintime ),
			apiaudiophonevents_finaltime: getHour( event.apiaudiophonevents_finaltime ),
			created_at: getDateWithHour( event.created_at ),
			updated_at:  event.updated_at.length > 0 ? getDateWithHour( event.updated_at ) : '',
			// apiaudiophonevents_status: event.apiaudiophonevents_status.length > 0 ? toCapitalize( event.apiaudiophonevents_status ) 
			//	: 'Ingresado',
			id_apiaudiophoneservices: event.id_apiaudiophoneservices.toString(),
			apiaudiophonevents_totalhours: hourToObject( event.apiaudiophonevents_totalhours )
		};
	}
}