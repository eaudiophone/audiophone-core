import React from 'react';

import 'bootstrap/js/dist/collapse';
import './Navbar.css';

const Navbar = () => (

	<div className="navbar-expand-sm">
		<nav 
			role="navigation" 
			className="navbar navbar-dark bg-dark"
		>
			<span className="navbar-brand">Audiophone</span>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			{ getMenu() }
         </nav>
	</div>
);

const getMenu = () => (

	<div 
		className="collapse navbar-collapse justify-content-end"
		id="navbarNav"
	>
		<ul className="navbar-nav">
            <li className="nav-item">
            	<span className="nav-link">Notifications</span>
            </li>
            <li className="nav-item">
            	<span className="nav-link">User</span>
            </li>
            <li className="nav-item">
            	<a className="nav-link" href="/">Sign out</a>
            </li>
        </ul>
	</div>	
);

export default Navbar;