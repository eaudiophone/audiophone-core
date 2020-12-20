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

	validateExceptionServer( error ) {
		
		// para acceder al objeto de la respuesta es error.response
		// Error Request es Instancia del objeto Error

		let payload = {
			ok: false,
			message: '',
			status: null,
			action: 'Error'
		};

		if ( error instanceof TypeError ) {
			return { 
				...payload, 
				status: 422, 
				message: error.message 
			};
		}
		
		const response = error.response;

		if ( !response ) {
			return { 
				...payload, 
				status: 500, 
				message: 'problemas internos del servidor' 
			};
		}
		
		switch ( response.status ) {

			case 400: 
				
				payload = { 
					...payload, 
					status: 400, 
					message: response.data.errorMessage || 'Error en parámetros de envio' 
				};
				
				return payload;

			case 401:	
				
				this.logOut();
				
				payload = { 
					...payload, 
					status: 401, 
					message: 'Usuario no autorizado' 
				};

				return payload; 

			case 403:

				payload = { ...payload, message: 'Prohibido el acceso', status: 403 };
				
				return payload;

			case 404:
				
				payload = { 
					...payload, 
					status: 404, 
					message: response.data.errorMessage || 'Recurso no encontrado', 
					action: 'Warning' 
				};
				
				return payload;

			case 405:
	
				payload = { 
					...payload, 
					message: response.data.apiaudiophoneusermessage || 'Metodo de acceso no permitido', 
					status: 405 
				};
				
				return payload;

			case 409:

				payload = { ...payload, status: 409, message: 'Conficto de información' };	
				
				return payload;

			case 422:

				payload = { 
					...payload, 
					message: response.data.apiaudiophoneusermessage || 'entidad inprocesable por el servidor', 
					status: 422 
				};
				
				return payload;

			default: // 500

				payload = { ...payload, message: 'problemas internos del servidor', status: 500 };
				
				return payload;
		}
	}
}
