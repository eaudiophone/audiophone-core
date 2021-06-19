import { lazy } from 'react';
import {
	UserPage,
	DayPage,
	BudgetPage,
	EventsAdminPage,
	EventPageForm,
	EventPage,
	ProfilePage,
	ItemsPage,
	DetailBudgetPage,
	ClientsPage,
	BalancePage
} from '../pages/index';

export const routesApp = [
	{ path: '/', component: lazy(() => import('../pages/home/HomePage') ) }, // main
	{ path: '/users', component: UserPage, admin: true },
	{ path: '/day', component: DayPage, admin: true },
	{ path: '/budget/:id', component: DetailBudgetPage, admin: true },
	{ path: '/budget', component: BudgetPage, admin: true },
	{ path: '/events-admin', component: EventsAdminPage, admin: true },
	{ path: '/event/new', component: EventPageForm, admin: false },
	{ path: '/event/:id', component: EventPageForm, admin: false },
	{ path: '/event', component: EventPage, admin: false },
	{ path: '/items', component: ItemsPage, admin: true },
	{ path: '/clients/balance/:id', component: BalancePage, admin: true },
	{ path: '/clients', component: ClientsPage, admin: true },
	{ path: '/profile', component: ProfilePage },
];

export const rootRoutes = [
	{ path: '/register', component: lazy(() => import('../pages/register/RegisterPage') ) },  // main
	{ path: '/login', component: lazy(() => import('../pages/login/LoginPage') ) }, // main
];
