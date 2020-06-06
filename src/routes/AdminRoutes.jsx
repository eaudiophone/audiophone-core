import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { routesApp } from './RoutesList';

// import { NoLoginGuard } from '../services/LoginGuard';

const AdminRoutes = () => (

	<Switch>
		{ 
			routesApp.filter( ( route ) => route.admin ).map(( route, index ) => (
				<Route path={ route.path } component={ route.component } key={ index } />
				/*
					<Route key={ index } path={ route.path } render={ () => NoLoginGuard( route.component ) } /> 
				*/
			)) 
		}
	</Switch>
); 

export default AdminRoutes;