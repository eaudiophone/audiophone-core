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

		return this.backendService.logIn('login', login )
			.then( resp => {

				if ( resp.data.status >= 400 && resp.data.status < 500 ) {
					
					return {
						ok: false,
						message: resp.data.message
					};
				}

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

				return {
					ok: true,
					message: null
				};

			})
			.catch( error => false );
	}

	logOut() {
		return sessionStorage.removeItem('logged');
	}

	isLogged() {
		return sessionStorage.getItem('logged') ? true : false;
	}
}

export default AuthService;