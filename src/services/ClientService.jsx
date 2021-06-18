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

		return new Promise(( resolve, reject ) => {
			
			let url = `apiaudiophoneclient/show/${ this.id }`;

			this.authService.postClient( url )
				.then(( response ) => {
					console.log( response );
					resolve({
						clients: response.data.apiaudiophoneclientshow.data,
						totalClients: response.data.apiaudiophoneclientshow.total,  
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
}