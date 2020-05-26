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

		return this.backendService.logIn('oauth/token', login )
			.then( resp => {

				const { access_token } = resp.data;

				sessionStorage.setItem('token', access_token );

				return true;
			})
			.catch( error => false );
	}

	logOut() {
		return sessionStorage.removeItem('token');
	}

	isLogged() {
		return sessionStorage.getItem('token') ? true : false;
	}
}

export default AuthService;