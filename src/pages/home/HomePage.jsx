import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import NavbarComponent from './../../components/navbar/NavbarComponent';
import AdminRoutes from './../../routes/AdminRoutes';
import UserRoutes from './../../routes/UserRoutes';

import './HomePage.css';

class HomePage extends Component {

	render() {

		const ROLE = JSON.parse( sessionStorage.getItem('logged') ).role;

		return (

			<Container fluid className="p-0">
				<NavbarComponent role={ ROLE } />
				<Container>

						<Row>
							<Col sm={ 12 }>
								<div id="content">
									{ ROLE === 'USER_ROLE' ? ( <UserRoutes /> ) : ( <AdminRoutes /> ) }	
								</div>
							</Col>
						</Row>

				</Container>	
			</Container>
		);
	}
}

export default HomePage;