import React, { Component } from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import './NavbarComponent.css';

class NavbarComponent extends Component {

	validateProfile() {

		if ( this.props.role === 'ADMIN_ROLE' ) {

			return (

				<NavDropdown title="Gestion">
					<NavDropdown.Item href="/home/budget">Presupuesto</NavDropdown.Item>
	        <NavDropdown.Item href="/home/day">Dias de servicios</NavDropdown.Item>
	        <NavDropdown.Item href="/home/users">Usuarios</NavDropdown.Item> 
				</NavDropdown>
			);

		} else {

			return (

				<NavDropdown title="Eventos">
		      <NavDropdown.Item href="/home/event/new">Nuevo evento</NavDropdown.Item>
		      <NavDropdown.Item href="/home/event">Ver eventos</NavDropdown.Item> 
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
				{ this.validateProfile() }
				<Nav.Link href="/home/profile">Perfil</Nav.Link>
				<Nav.Link href="/">Salir</Nav.Link>
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