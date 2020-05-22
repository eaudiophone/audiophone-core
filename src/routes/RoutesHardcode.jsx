import NewEventPage from './../pages/events/NewEventPage';
import EditEventPage from './../pages/events/EditEventPage';
import IndexEventPage from './../pages/events/IndexEventPage';
import ProfilePage from './../pages/profile/ProfilePage';
import UserPage from './../pages/user/UserPage';
import DayPage from './../pages/day/DayPage';
import BudgetPage from './../pages/budget/BudgetPage';
import EventsAdminPage from './../pages/events-admin/IndexEventsAdminPage';
import HomePage from './../pages/home/HomePage';
import LoginPage from './../pages/login/LoginPage';
import RegisterPage from './../pages/register/RegisterPage';

export const routesApp = [
	{ path: '/users', component: UserPage },
	{ path: '/day', component: DayPage },
	{ path: '/budget', component: BudgetPage },
	{ path: '/profile', component: ProfilePage },
	{ path: '/events-admin', component: EventsAdminPage },
	{ path: '/event/new', component: NewEventPage },
	{ path: '/event/:id', component: EditEventPage },
	{ path: '/event', component: IndexEventPage }
];

export const rootRoutes = [
	{ path: '/register', component: RegisterPage },
	{ path: '/login', component: LoginPage },
	{ path: '/', component: HomePage }
];