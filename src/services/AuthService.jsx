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
			email: login.email,
			password: login.password
		}

		console.log( request );

		this.backendService.getClient();
		
		// here petition http to api
		// ---------------------------------------------------
		// console.log( 'datos enviados al servidor: ', login );
		// -----------------------------------------------------
	}

	logOut() {
		console.log( 'exit of application' );
	}
}

export default AuthService;