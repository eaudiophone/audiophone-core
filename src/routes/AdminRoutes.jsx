import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UserPage from './../pages/user/UserPage';
import DayPage from './../pages/day/DayPage';
import BudgetPage from './../pages/budget/BudgetPage';
import ProfilePage from './../pages/profile/ProfilePage';
import EventsAdminPage from './../pages/events-admin/IndexEventsAdminPage';
import NotFoundPage from './../pages/notfound/NotFoundPage';

const getInfo = () => ( <h2>Info works</h2> );

const AdminRoutes = () => (

	<Switch>
		<Route path="/users" component={ UserPage } />
		<Route path="/day" component={ DayPage } />
		<Route path="/budget" component={ BudgetPage } />
		<Route path="/info" component={ getInfo } />
		<Route path="/profile" component={ ProfilePage } />
		<Route path="/events-admin" component={ EventsAdminPage }/>
		<Route path="**" component={ NotFoundPage } />
	</Switch>
); 

export default AdminRoutes;