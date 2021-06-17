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
					resolve( response );
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
					resolve( response );
				})
				.catch(( error ) => {
					reject( this.authService.validateExceptionServer( error ) );
				});
		})
	}
}