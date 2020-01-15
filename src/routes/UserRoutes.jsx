import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecordPage from './../pages/record/RecordPage';
import RentalPage from './../pages/rental/RentalPage';

// data de prueba
const getInfo = () => <h2>Info works</h2>;

const UserRoutes = () => (

	<Switch>
		<Route 
			path="/home/records"
			component={ RecordPage }
		/>
		<Route 
			path="/home/rental"
			component={ RentalPage }
		/>
		<Route 
			path="/home/info"
			component={ getInfo }
		/>
	</Switch>
); 

export default UserRoutes;