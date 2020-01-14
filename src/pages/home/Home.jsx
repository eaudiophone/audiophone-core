import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import NavbarComponent from './../../components/navbar/NavbarComponent';
import SidebarComponent from './../../components/sidebar/SidebarComponent';

import AdminRoutes from './../../routes/Admin';
import UserRoutes from './../../routes/User';

import './Home.css';

class Home extends Component {

	getContent( role ) {

		if ( role === 'ADMIN_ROLE' )  {

			return ( <AdminRoutes /> );
		} 

		else {

			return ( <UserRoutes /> );
		}
	}

	render() {

		return (

			<div className="container-fliud">
				
				<NavbarComponent />

				<Router>

					<div className="row">

						<div className="col-3 d-none bg-dark d-md-block">
							<SidebarComponent admin="USER_ROLE" />
						</div>

						<div className="col-sm-9">
							<div id="content">
								{ this.getContent( 'USER_ROLE' ) }
							</div>
						</div>
					</div>
			
				</Router>
			</div>	
		);
	}
}

export default Home;