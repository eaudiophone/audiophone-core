import React from 'react';
import { Route, Switch } from 'react-router-dom';
import User from './../pages/user/User';
import Day from './../pages/day/Day';
import Budget from './../pages/budget/Budget';

const getInfo = () => ( <h2>Info works</h2> );

const AdminRoutes = () => (

	<Switch>
		<Route path="/home/user" component={ User } />
		<Route path="/home/day" component={ Day } />
		<Route path="/home/budget" component={ Budget } />
		<Route path="/home/info" component={ getInfo } />
	</Switch>
); 

export default AdminRoutes;