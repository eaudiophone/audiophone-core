import { AuthService } from './AuthService';

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

					const event = data.apiaudiophoneventdata.find( event => idEvent === event.apiaudiophonevents_id );
					
					resolve( event ); 
				})
				.catch( error => reject( this.authService.validateExceptionServer( error ) ) )
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

	updateEvent( idEvent = 1, event ) {

	}
}