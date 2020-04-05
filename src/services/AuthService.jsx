import BackendService from './BackendService';

class AuthService {

	backendService = new BackendService();

	logIn( login, rememberMe ) {

		if ( rememberMe ) { 		
			
			localStorage.setItem( 'email', login.audiophoneusers_email ); 

		} else {

			localStorage.removeItem( 'email' );
			
		}

		let request = {
			audiophoneusers_email: login.audiophoneusers_email,
			audiophoneusers_password: login.audiophoneusers_password
		}

		this.backendService.postClient( request );
	}

	logOut() {
		// localStorage.removeItem('logged');
		console.log('salida de la aplicación');
	}
}

export default AuthService;