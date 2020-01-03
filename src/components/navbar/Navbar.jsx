import React from 'react';

import 'bootstrap/js/dist/collapse';
import './Navbar.css';

class Navbar extends React.Component {

	render() {
		
		return (
	
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
					{ this.getMenu() }
          		</nav>
			</div>
		);
	}

	getMenu() {

		return (

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
	}
}

export default Navbar;