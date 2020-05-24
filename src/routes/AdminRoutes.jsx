import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routesApp } from './RoutesList';

// import AuthService from './../services/AuthService';
// import RedirectService from './../services/RedirectService';

const AdminRoutes = () => (

	<Switch>
		{ 
			routesApp.filter( ( route ) => route.admin ).map(( route, index ) => (
				<Route path={ route.path } component={ route.component } key={ index } />
				/*
					<Route key={ index } path={ route.path } render={ () => {
					
						if ( new AuthService().isLogged() ) {
							return route.component
						} else {
							<RedirectService route="/login" />
						}
					}} /> 
				*/
			)) 
		}
	</Switch>
); 

export default AdminRoutes;