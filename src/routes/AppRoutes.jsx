import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { rootRoutes, routesApp } from './RoutesList';
import { NoLoginGuard, LoginGuard } from '../guards/LoginGuard';

const AppRoutes = () => (

	<Suspense fallback={ <div>Loading...</div> }>
		<Switch>
			{ 
				rootRoutes.map( ( route, index ) => (
					<NoLoginGuard key={ index }  component={ route.component } path={ route.path } />
				)) 
			}
			<LoginGuard component={ routesApp[0].component } path={ routesApp[0].path } />
		</Switch>
	</Suspense>
);

export default AppRoutes;