import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NewEventPage from './../pages/events/NewEventPage';
import EditEventPage from './../pages/events/EditEventPage';
import IndexEventPage from './../pages/events/IndexEventPage';
import ProfilePage from './../pages/profile/ProfilePage';
import NotFoundPage from './../pages/notfound/NotFoundPage';

const UserRoutes = () => (

	<Switch>
		<Route 
			exact path="event/new"
			component={ NewEventPage }
		/>
		<Route 
			exact path="/event/:id"
			component={ EditEventPage }
		/>
		<Route 
			exact path="/event"
			component={ IndexEventPage }
		/>
		<Route
			exact path="/profile"
			component={ ProfilePage }
		/>
		<Route path="**" component={ NotFoundPage } />
	</Switch>
); 

export default UserRoutes;