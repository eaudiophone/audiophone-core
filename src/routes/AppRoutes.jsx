import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { rootRoutes } from './RoutesList';

// import { LoginGuard } from '../services/LoginGuard';


const AppRoutes = () => (

	<Suspense fallback={ <div>Loading...</div> }>
		<Switch>
			{ 
				rootRoutes.map( ( route, index ) => (
					<Route key={ index } path={ route.path } component={ route.component } />
				 /* 
				 	<Route key={ index } path={ route.path } render={ () => LoginGuard( route.component ) }  /> 
				*/ 
				)) 
			}
		</Switch>
	</Suspense>
);

export default AppRoutes;