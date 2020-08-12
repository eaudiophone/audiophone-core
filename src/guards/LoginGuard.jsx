import React from 'react';

import { Route } from 'react-router-dom';

import { AuthService } from './../services/AuthService';
import RedirectService from './../services/RedirectService';


export const LoginGuard = ({ component, path }) => {

	if ( new AuthService().isLogged() === true ) {
		return <Route component={ component } path={ path } />;
	
	} else {
		return ( <RedirectService route="/login" /> );
	} 
}

export const NoLoginGuard = ({ component, path }) => {

	if ( new AuthService().isLogged() === false ) {
		return <Route component={ component } path={ path } />;
	
	} else {
		return ( <RedirectService route="/profile" /> );
	} 
}

