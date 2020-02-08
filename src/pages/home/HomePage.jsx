import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavbarComponent from './../../components/navbar/NavbarComponent';
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

			<Container fluid className="p-0">
				
				<NavbarComponent />

				<Container>
						<Row>
							<Col sm={ 12 }>
								<div id="content">
									{ this.getContent( 'USER_ROLE' ) }
								</div>
							</Col>
						</Row>
				</Container>	

			</Container>

		);
	}
}

export default HomePage;