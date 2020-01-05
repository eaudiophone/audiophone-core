import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Record from './../pages/record/Record';
import Rental from './../pages/rental/Rental';

// data de prueba
const getInfo = () => <h2>Info works</h2>;

const UserRoutes = () => (

	<Switch>
		<Route 
			path="/home/records"
			component={ Record }
		/>
		<Route 
			path="/home/rental"
			component={ Rental }
		/>
		<Route 
			path="/home/info"
			component={ getInfo }
		/>
	</Switch>
); 

export default UserRoutes;