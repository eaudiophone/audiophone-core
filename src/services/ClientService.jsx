import { AuthService } from './AuthService';


export class ClientService {

	constructor() {
		this.authService = new AuthService();

		this.id = this.authService.getLogged().id;
	}


	createClient( client ) {

		return new Promise(( resolve, reject ) => {
			this.authService.postClient(`apiaudiophoneclient/store/${ this.id }`, client )
				.then(( response ) => {
					resolve({
						message: response.data.apiaudiophoneclientmessage,
						status: response.data.status,
						client: response.data.apiaudiophoneclientstore
					})
				})
				.catch(( error ) => {
					reject( this.authService.validateExceptionServer( error ) );
				})
		})
	}

	getClients( pagination ) {

		console.log( pagination );

		return new Promise(( resolve, reject ) => {

			let url = `apiaudiophoneclient/show/${ this.id }`;
			let body = null;

			if ( pagination ) {
					body = { start: pagination.start };
			}

			this.authService.postClient( url, body )
				.then(( response ) => {
					console.log( response );
					resolve({
						clients: response.data.apiaudiophoneclientshow,
						totalClients: response.data.bdclientstotal,
						loading: false
					});
				})
				.catch(( error ) => {
					reject( this.authService.validateExceptionServer( error ) );
				});
		})
	}

	updateClients( client ) {
		return new Promise(( resolve, reject ) => {

			let url = `apiaudiophoneclient/update/${ this.id }`;

			this.authService.putClient( url, client )
				.then(( response ) => {
					resolve({
						message: response.data.apiaudiophoneclientmessage,
						clientUpdate: response.data.apiaudiophoneclientsupdate
					});
				})
				.catch(( error ) => {
					reject( this.authService.validateExceptionServer( error ) );
				})

		});
	}

	searchClient( search = '' ) {

		return new Promise( ( resolve, reject ) => {

			let body = null;

			if ( search.length > 0 ) {
				 body = { stringsearch: search };
			}

			this.authService.postClient(`apiaudiophoneclient/show/${ this.id }`, body )
				.then( resp => {
					resolve({
						clients: resp.data.apiaudiophoneclientshow
					});
				})
				.catch( error => reject( this.authService.validateExceptionServer( error )) );
			});
	}
}
