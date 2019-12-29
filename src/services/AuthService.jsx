class AuthService {

	logIn( login, rememberMe ) {

		if ( rememberMe ) { 		
			localStorage.setItem( 'email', login.user ); 
		}
		else { 
			localStorage.removeItem( 'email' );
		}
		
		// here petition http to api
		// ---------------------------------------------------
		console.log( 'datos enviados al servidor: ', login );
		// -----------------------------------------------------
	}

	logOut() {
		
		console.log( 'exit of application' );
	}
}

export default AuthService;