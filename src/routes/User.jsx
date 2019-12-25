import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Record from './../pages/record/Record';
import Rental from './../pages/rental/Rental';

// data de prueba
const getInfo = () => <h2>Info works</h2>;

const UserRoutes = () => (

	<Switch>
		<Route 
			path="/records"
			component={ Record }
		/>
		<Route 
			path="/rental"
			component={ Rental }
		/>
		<Route 
			path="/info"
			component={ getInfo }
		/>
	</Switch>
); 

export default UserRoutes;