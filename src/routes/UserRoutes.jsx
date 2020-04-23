import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NewEventPage from './../pages/events/NewEventPage';
import EditEventPage from './../pages/events/EditEventPage';
import IndexEventPage from './../pages/events/IndexEventPage';
import ProfilePage from './../pages/profile/ProfilePage';

const UserRoutes = () => (

	<Switch>
		<Route path="/event/new" component={ NewEventPage } />
		<Route path="/event/:id" component={ EditEventPage } />
		<Route path="/event" component={ IndexEventPage } />
		<Route path="/profile" component={ ProfilePage } />
	</Switch>
); 

export default UserRoutes;