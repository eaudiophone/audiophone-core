import React from 'react';
import { Route, Switch } from 'react-router-dom';
import User from './../pages/user/User';
import Day from './../pages/day/Day';
import Budget from './../pages/budget/Budget';

const getInfo = () => ( <h2>Info works</h2> );

const AdminRoutes = () => (

	<Switch>
		<Route 
			path="/user"
			component={ User }
		/>
		<Route 
			path="/day"
			component={ Day }
		/>
		<Route 
			path="/budget"
			component={ Budget }
		/>
		<Route 
			path="/info"
			component={ getInfo }
		/>
	</Switch>
); 

export default AdminRoutes;