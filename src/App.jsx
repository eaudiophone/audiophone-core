import React from 'react';
import {
	BrowserRouter as Router,
	Route,
} from 'react-router-dom';

import Home from './pages/home/Home';
import Login from './pages/login/Login';

// routes app
const App = () => (

	<Router>
		<Route path="/home" component={ Home } />
		<Route path="/login" component={ Login } />
	</Router>

);

export default App;