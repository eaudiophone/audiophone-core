import { lazy } from 'react';

import NewEventPage from './../pages/events/NewEventPage';
import EditEventPage from './../pages/events/EditEventPage';
import IndexEventPage from './../pages/events/IndexEventPage';
import ProfilePage from './../pages/profile/ProfilePage';
import UserPage from './../pages/user/UserPage';
import DayPage from './../pages/day/DayPage';
import BudgetPage from './../pages/budget/BudgetPage';
import EventsAdminPage from './../pages/events-admin/IndexEventsAdminPage';

export const routesApp = [
	{ path: '/users', component: UserPage, admin: true },
	{ path: '/day', component: DayPage, admin: true },
	{ path: '/budget', component: BudgetPage, admin: true },
	{ path: '/events-admin', component: EventsAdminPage, admin: true },
	{ path: '/event/new', component: NewEventPage, admin: false },
	{ path: '/event/:id', component: EditEventPage, admin: false },
	{ path: '/event', component: IndexEventPage, admin: false },
	{ path: '/profile', component: ProfilePage, admin: true }
];

export const rootRoutes = [
	{ path: '/register', component: lazy(() => import('./../pages/register/RegisterPage') ) },
	{ path: '/login', component: lazy(() => import('./../pages/login/LoginPage')) },
	{ path: '/', component: lazy(() => import('./../pages/home/HomePage')) }
];