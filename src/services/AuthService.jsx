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

				const { access_token, token_type } = resp.data;

				sessionStorage.setItem('token', JSON.stringify({ 
					token: access_token, 
					type: token_type 
				}));

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