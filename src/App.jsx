import React, { lazy, Suspense } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

// load dynamic with lazy. Return a promise

// pages of aplication
const Home = lazy(() => import('./pages/home/Home') );
const Login = lazy(() => import('./pages/login/Login'));
const Register = lazy(() => import('./pages/register/Register'));

// router principal:
const App = () => (

	<Router>
		<Suspense fallback={ <div>Loading...</div> }>
			<Switch>
				<Route path="/home" component={ Home } />
				<Route path="/register" component={ Register } />
				<Route exact path="/" component={ Login } />
			</Switch>
		</Suspense>
	</Router>
); 


export default App;