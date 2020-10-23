import { BackendService } from './BackendService';

export class AuthService extends BackendService {

	logIn( login ) {

		if ( login.remember ) { 		
			
			localStorage.setItem( 'email', login.audiophoneusers_email ); 

		} else {

			localStorage.removeItem( 'email' );
			
		}

		delete login.remember;

		login = {
			username: login.audiophoneusers_email,
			password: login.audiophoneusers_password
		};

		return this.authenticate('login', login )
			.then( resp => {

				const logged = {
					email: resp.data.apiaudiophoneusers_email,
					fullname: resp.data.apiaudiophoneusers_fullname,
					id: resp.data.apiaudiophoneusers_id,
					role: resp.data.apiaudiophoneusers_role,
					access_token: resp.data.apiToken.access_token,
					expires_in: resp.data.apiToken.expires_in,
					refresh_token: resp.data.apiToken.access_token 
				};

				sessionStorage.setItem('logged', JSON.stringify( logged ) );

				return { // OK
					ok: true,
					message: null,
					status: resp.data.status,
				};

			})
			.catch( error => this.validateExceptionServer( error ) );
	}

	logOut() {
		return sessionStorage.removeItem('logged');
	}

	isLogged() {
		return sessionStorage.getItem('logged') ? true : false;
	}

	getLogged() {
		return JSON.parse( sessionStorage.getItem('logged') );
	}

	validateExceptionServer({ response }) {
		
		// para acceder al objeto de la respuesta es error.response
			
		console.log( response );

		let payload = {
			ok: false,
			message: '',
			status: null,
			action: 'Error'
		}

		switch ( response.status ) {

			case 401:	
				
				this.logOut();
				payload = { ...payload, status: 401, message: 'Usuario no autorizado' };
				return payload; 

			case 403:

				payload = { ...payload, message: 'Prohibido el acceso', status: 403 };
				return payload;

			case 404:
				
				payload = { ...payload, status: 404, message: response.data.errorMessage, action: 'Warning' };
				return payload;

			case 405:
	
				payload = { ...payload, message: 'Método de acceso no permitido', status: 405 };
				return payload;

			case 409:

				payload = { ...payload, status: 409, message: 'Conficto de información' };	
				return payload;

			case 422:

				payload = { ...payload, message: 'entidad inprocesable por el servidor', status: 422 };
				return payload;

			default: // 500

				payload = { ...payload, message: 'problemas internos del servidor', status: 500 };
				return payload;
		}
	}
}
