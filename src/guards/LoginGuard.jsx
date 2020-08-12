import React from 'react';
import { Route } from 'react-router-dom';
import { AuthService } from './../services/AuthService';
import RedirectService from './../services/RedirectService';

export const LoginGuard = ( props ) => {
	return new AuthService().isLogged() ? ( <Route { ...props } /> ) : ( <RedirectService route="/login" /> );
}

export const NoLoginGuard = ( props ) => {
	return !new AuthService().isLogged() ? ( <Route { ...props } /> ) : ( <RedirectService route="/profile" /> );  
}
