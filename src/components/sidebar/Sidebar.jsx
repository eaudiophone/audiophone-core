import React, { Component } from 'react';
import { 
	Link,
	BrowserRouter as Router,
} from 'react-router-dom';

// rutes
import Home from './../../routes/Home';

class Sidebar extends Component {

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
				<Home />
			</Router>
		);
	}
}

export default Sidebar;