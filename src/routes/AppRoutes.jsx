import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

// pages
const HomePage = lazy(() => import('./../pages/home/HomePage') );
const LoginPage = lazy(() => import('./../pages/login/LoginPage'));
const RegisterPage = lazy(() => import('./../pages/register/RegisterPage'));
const NotFoundPage = lazy(() => import('./../pages/notfound/NotFoundPage'));

const AppRoutes = () => (

	<Suspense fallback={ <div>Loading...</div> }>
		<Switch>
			<Route path="/home" component={ HomePage } />
			<Route path="/register" component={ RegisterPage } />
			<Route exact path="/" component={ LoginPage } />
			<Route component={ NotFoundPage } />
		</Switch>
	</Suspense>
);

export default AppRoutes;