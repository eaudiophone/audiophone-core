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
			.catch( error => {
				return	{ ok: false, message: 'problemas internos del servidor' }
			});
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
}
