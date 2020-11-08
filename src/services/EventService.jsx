import { AuthService } from './AuthService';
import { getDifferenceHours, verifyRangeHours, getHour } from './../util-functions/date-format';

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

	getEvent( idEvent = 1 ) {

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

						// valor para validacion del form
						id_apiaudiophoneservices: event.id_apiaudiophoneservices.toString()  
					};

					resolve( event ); 
				})
				.catch( error => reject( this.authService.validateExceptionServer( error ) ) )
		});
	}

	getAllEvents() {

		return new Promise(( resolve, reject ) => {
			
			const id = this.authService.getLogged().id;

			this.authService.postClient(`apiaudiophonevent/show/${ id }`)
				.then(({ data }) => resolve( data.apiaudiophoneventdata ))
				.catch( error => reject( this.authService.validateExceptionServer( error ) ) );
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

	deleteEvent( idEvent ) {
	}

	verifyRangeHours( start = '00:00', end = '00:00' ) {
		return verifyRangeHours( start, end );
	}

	getDifferenceHours( start = '00:00', end = '00:00' ) {
		return getDifferenceHours( start, end );
	}
}