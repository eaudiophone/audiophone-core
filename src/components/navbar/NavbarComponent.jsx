import React, { Component } from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';

import AuthService from './../../services/AuthService';
 
import './NavbarComponent.css';

class NavbarComponent extends Component {

	authService = new AuthService();

	validateProfile() {

		if ( this.props.role === 'ADMIN_ROLE' ) {

			return (
				<NavDropdown title="Gestion">
					<NavDropdown.Item href="/budget">Presupuesto</NavDropdown.Item>
	        <NavDropdown.Item href="/day">Dias de servicios</NavDropdown.Item>
	        <NavDropdown.Item href="/users">Usuarios</NavDropdown.Item> 
				</NavDropdown>
			);

		} else {

			return (

				<NavDropdown title="Eventos">
		      <NavDropdown.Item href="/event/new">Nuevo evento</NavDropdown.Item>
		      <NavDropdown.Item href="/event">Ver eventos</NavDropdown.Item> 
		    </NavDropdown>
			);
		}
	}

	getProfile() {

		return (
			<Navbar.Collapse 
			id="responsive-navbar-nav"
		>
			<Nav className="w-100 justify-content-end">

				{ this.props.role === 'ADMIN_ROLE' &&  
					<Nav.Link href="/events-admin">Eventos</Nav.Link>
				}
				{ this.validateProfile() }
				<Nav.Link href="/profile">Perfil</Nav.Link>
				<Nav.Link 
					href="/login" 
					onSelect={ () => this.authService.logOut() }>Salir</Nav.Link>
			</Nav>
		</Navbar.Collapse>
		);

	}

	render() {

		return (

			<Navbar 
				collapseOnSelect 
				expand="sm" 
				bg="dark" 
				variant="dark"
				sticky="top"
			>	
		  		<Navbar.Brand>Audiophone</Navbar.Brand>
		  		<Navbar.Toggle aria-controls="responsive-navbar-nav" />
		 		{ this.getProfile() }
			</Navbar>
		);

	}
}

export default NavbarComponent;