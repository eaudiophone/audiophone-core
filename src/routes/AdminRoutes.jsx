import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UserPage from './../pages/user/UserPage';
import DayPage from './../pages/day/DayPage';
import BudgetPage from './../pages/budget/BudgetPage';
import ProfilePage from './../pages/profile/ProfilePage';

const getInfo = () => ( <h2>Info works</h2> );

const AdminRoutes = () => (

	<Switch>
		<Route path="/home/users" component={ UserPage } />
		<Route path="/home/day" component={ DayPage } />
		<Route path="/home/budget" component={ BudgetPage } />
		<Route path="/home/info" component={ getInfo } />
		<Route path="/home/profile" component={ ProfilePage } />
	</Switch>
); 

export default AdminRoutes;