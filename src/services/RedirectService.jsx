import React from 'react';
import { Redirect } from 'react-router-dom';

class RedirectService {

	home = () => ( <Redirect to="/home" /> );
	login = () => ( <Redirect to="/" /> );
}

export default RedirectService;