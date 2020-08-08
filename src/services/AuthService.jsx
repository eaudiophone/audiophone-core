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

				if ( this.verifyStatusServerError( resp ) ) {
					
					return {
						ok: false,
						message: resp.data.message,
						status: resp.data.status
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

				return { // OK
					ok: true,
					message: null,
					status: resp.data.status,
				};

			})
			.catch( error => ({ ok: false, message: 'problemas internos del servidor' }) );
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

	verifyStatusServerError( resp ) {
		
		if ( resp.data.status >= 400 && resp.data.status < 500 ) {
			return true;
		
		} else if ( resp.data.status >= 500 ) {
			return true;

		} else {
			return false;
		} 
	}
}

export default AuthService;