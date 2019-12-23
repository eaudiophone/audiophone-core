import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

// pages
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

// router principal:
function App() {

	return (

		<Router>
			<Switch>
				<Route path="/home" component={ Home } />
				<Route path="/register" component={ Register } />
				<Route path="/" component={ Login } />
			</Switch>
		</Router>
	); 
}

export default App;