import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthService } from './../services/AuthService';
import RedirectService from './../services/RedirectService';

export const LoginGuard = ( props ) => {
	return new AuthService().isLogged() ? ( <Route { ...props } /> ) : ( <RedirectService route="/login" /> );
}

LoginGuard.propTypes = {
	path: PropTypes.string.isRequired,
	component: PropTypes.object.isRequired
};

export const NoLoginGuard = ( props ) => {
	return !new AuthService().isLogged() ? ( <Route { ...props } /> ) : ( <RedirectService route="/profile" /> );  
}

NoLoginGuard.propTypes = {
	path: PropTypes.string.isRequired,
	component: PropTypes.object.isRequired
};