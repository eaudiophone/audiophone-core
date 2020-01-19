import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecordPage from './../pages/record/RecordPage';
import RentalPage from './../pages/rental/RentalPage';
import NewEventPage from './../pages/events/NewEventPage';

// data de prueba
const getInfo = () => <h2>Info works</h2>;

const UserRoutes = () => (

	<Switch>
		<Route 
			path="/home/new"
			component={ NewEventPage }
		/>
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