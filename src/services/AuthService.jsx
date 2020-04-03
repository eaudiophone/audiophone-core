import BackendService from './BackendService';

class AuthService {

	constructor() {
		this.backendService = new BackendService();
	}

	logIn( login, rememberMe ) {

		if ( rememberMe ) { 		
			localStorage.setItem( 'email', login.email ); 
		} else {
			localStorage.removeItem( 'email' );
		}

		let request = {
			audiophoneusers_email: login.email,
			audiophoneusers_password: login.password
		}

		this.backendService.postClient( request );
		
		// here petition http to api
		// ---------------------------------------------------
		// console.log( 'datos enviados al servidor: ', login );
		// -----------------------------------------------------
	}

	logOut() {
		// localStorage.removeItem('logged');
		console.log('salida de la aplicación');
	}
}

export default AuthService;