import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom';

class Sidebar extends Component {

	getRecordsInfo()  {
		return ( <h2>Records works</h2> );
	}

	getRentalInfo() {
		return ( <h2>Rental works</h2> );
	}

	getInfo() {
		return ( <h2>Info works</h2> );
	}

	getSidebar() {

		return (
				
			<div>	
				<nav>
					<h3>Gestionar servicios</h3>
					<hr />
          			<ul>
            			<li><Link to="/records">Records</Link></li>
            			<li><Link to="/rental">Rental</Link></li>
          			</ul>
          			<h3>Información</h3>
          			<hr />
          			<ul>
            			<li><Link to="/info">Info</Link></li>
          			</ul>
          		</nav>
			</div>
		);
	}

	render() {

		return( 

			<Router>

				{ this.getSidebar() }
			
				{ /*Rutas de aplicacion*/ }

				<Switch>
					<Route 
						path="/records"
						component={ this.getRecordsInfo  }
					>
					</Route>
					<Route 
						path="/rental"
						component={ this.getRentalInfo }
					></Route>
					<Route 
						path="/info"
						component={ this.getInfo }
					></Route>
				</Switch>

			</Router>
		);
	}
}

export default Sidebar;