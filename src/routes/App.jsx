import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

// pages
const Home = lazy(() => import('./../pages/home/Home') );
const Login = lazy(() => import('./../pages/login/Login'));
const Register = lazy(() => import('./../pages/register/Register'));
const NotFound = lazy(() => import('./../pages/notfound/NotFound'));

const AppRoutes = () => (

	<Suspense fallback={ <div>Loading...</div> }>
		<Switch>
			<Route path="/home" component={ Home } />
			<Route path="/register" component={ Register } />
			<Route exact path="/" component={ Login } />
			<Route path="**" component={ NotFound } />
		</Switch>
	</Suspense>
);

export default AppRoutes;