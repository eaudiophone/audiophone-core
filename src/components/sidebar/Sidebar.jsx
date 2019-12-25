import React, { Component } from 'react';
import { Link, BrowserRouter as Router, } from 'react-router-dom';
import UserRoutes from './../../routes/User';
import AdminRoutes from './../../routes/Admin';
import { MENU } from './Sidebar-hardcode'; 

class Sidebar extends Component {

	checkUser() {

		if ( this.props.admin ) {

			return (
				<div>
					{ this.getSidebar( MENU.admin ) }
					<AdminRoutes />;
				</div>
			);
						
		} else {

			return (
				<div>
					{ this.getSidebar( MENU.user ) }
					<UserRoutes />;
				</div>
			);
		} 
	}

	getSidebar( role ) {

		return (
				
			<div>	
				<nav>
					<h3>Gestionar servicios</h3>
          			<ul>
          				{ 	role.map( ( element ) => {

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
				{ this.checkUser() }
			</Router>
		);
	}
}

export default Sidebar;