import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { rootRoutes } from './RoutesList';
// import AuthService from './../services/AuthService';
// import RedirectService from './../services/RedirectService';

const AppRoutes = () => (

	<Suspense fallback={ <div>Loading...</div> }>
		<Switch>
			{ 
				rootRoutes.map( ( route, index ) => (
					<Route key={ index } path={ route.path } component={ route.component } />
				 /* 
				 		<Route key={ index } path={ route.path } render={ () => {
					
						if ( new !AuthService().isLogged() ) {
							return route.component
						} else {
							<RedirectService route="/profile" />
						}
					}} /> 

				*/ 
				)) 
			}
		</Switch>
	</Suspense>
);

export default AppRoutes;