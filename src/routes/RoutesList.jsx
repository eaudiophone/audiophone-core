import { lazy } from 'react';

import EventPageForm from './../pages/events/EventPageForm';
import EventPage from './../pages/events/EventPage';
import ProfilePage from './../pages/profile/ProfilePage';
import UserPage from './../pages/user/UserPage';
import DayPage from './../pages/day/DayPage';
import BudgetPage from './../pages/budget/BudgetPage';
import EventsAdminPage from './../pages/events-admin/IndexEventsAdminPage';

export const routesApp = [
	{ path: '/', component: lazy(() => import('./../pages/home/HomePage')) },
	{ path: '/users', component: UserPage, admin: true },
	{ path: '/day', component: DayPage, admin: true },
	{ path: '/budget', component: BudgetPage, admin: true },
	{ path: '/events-admin', component: EventsAdminPage, admin: true },
	{ path: '/event/new', component: EventPageForm, admin: false },
	{ path: '/event/:id', component: EventPageForm, admin: false },
	{ path: '/event', component: EventPage, admin: false },
	{ path: '/profile', component: ProfilePage }
];

export const rootRoutes = [
	{ path: '/register', component: lazy(() => import('./../pages/register/RegisterPage') ) },
	{ path: '/login', component: lazy(() => import('./../pages/login/LoginPage')) },
];