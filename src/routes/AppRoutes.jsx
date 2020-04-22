import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

// pages
const HomePage = lazy(() => import('./../pages/home/HomePage') );
const LoginPage = lazy(() => import('./../pages/login/LoginPage'));
const RegisterPage = lazy(() => import('./../pages/register/RegisterPage'));

const AppRoutes = () => (

	<Suspense fallback={ <div>Loading...</div> }>
		<Switch>
			<Route path="/register" component={ RegisterPage } />
			<Route path="/login" component={ LoginPage } />
			<Route path="/" component={ HomePage } />
		</Switch>
	</Suspense>
);

export default AppRoutes;