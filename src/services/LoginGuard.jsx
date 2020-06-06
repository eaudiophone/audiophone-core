import React from 'react';

import AuthService from './AuthService';
import RedirectService from './RedirectService';


export const LoginGuard = ( component ) => {

	if ( new AuthService().isLogged() === true ) {
		return component;
	
	} else {
		return ( <RedirectService route="/login" /> );
	} 
}

export const NoLoginGuard = ( component ) => {

	if ( new AuthService().isLogged() === false ) {
		return component;
	
	} else {
		return ( <RedirectService route="/profile" /> );
	} 
}

