import BackendService from './BackendService';

class AuthService {

	backendService = new BackendService();

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

		return this.backendService.logIn('oauth/token', login );
	}

	logOut() {
		return localStorage.removeItem('token');
	}

	isLogged() {
		return localStorage.getItem('token') ? true : false;
	}
}

export default AuthService;