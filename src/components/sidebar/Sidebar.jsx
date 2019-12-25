import React, { Component } from 'react';
import { 
	Link,
	BrowserRouter as Router,
} from 'react-router-dom';

// rutes
import Home from './../../routes/Home';

import { MENU } from './Sidebar-hardcode'; // menu-hardcode


class Sidebar extends Component {

	getSidebar() {

		return (
				
			<div>	
				<nav>
					<h3>Gestionar servicios</h3>
					<hr />
          			<ul>
          				{ 	MENU.user.map( ( element ) => {

          						return ( 
          							<li key={ element.id }>
          								<Link to={ element.link }>
          									{ element.name }
          								</Link>
          							</li> 
          						)
          					}) 
          				}
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