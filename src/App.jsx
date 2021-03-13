import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

const App = () => (

	<Router basename="/audiophone-core">
		<AppRoutes />
	</Router>
);

export default App;
