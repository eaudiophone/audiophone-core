import React, { Component } from 'react';

import NavbarComponent from './../../components/navbar/NavbarComponent';
import SidebarComponent from './../../components/sidebar/SidebarComponent';

import AdminRoutes from './../../routes/AdminRoutes';
import UserRoutes from './../../routes/UserRoutes';

import './HomePage.css';

class HomePage extends Component {

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
		
			</div>	
		);
	}
}

export default HomePage;