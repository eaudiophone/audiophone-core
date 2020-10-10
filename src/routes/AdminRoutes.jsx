import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { routesApp } from './RoutesList' 


const AdminRoutes = () => (

	<Switch>
		{ 
			routesApp.filter( ( route ) => route.admin === true ).map(( route, index ) => (
				<Route path={ route.path } component={ route.component } key={ index } />
			)) 
		}
		<Route 
			path={ routesApp[routesApp.length - 1].path } 
			component={ routesApp[ routesApp.length - 1 ].component } 
		/>
	</Switch>
); 

export default AdminRoutes;