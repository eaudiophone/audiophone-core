import React from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import './NavbarComponent.css';

const getProfile = () => (

	<Navbar.Collapse 
		id="responsive-navbar-nav"
	>
		<Nav className="w-100 justify-content-end">
			<NavDropdown title="Eventos" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/home/event/new">Nuevo evento</NavDropdown.Item>
        <NavDropdown.Item href="/home/event">Ver eventos</NavDropdown.Item> 
      </NavDropdown>
			<Nav.Link href="/home/profile">Perfil</Nav.Link>
			<Nav.Link href="/">Salir</Nav.Link>
		</Nav>
	</Navbar.Collapse>
);

const NavbarComponent = () => (

	<Navbar 
		collapseOnSelect 
		expand="sm" 
		bg="dark" 
		variant="dark"
		sticky="top"
	>	
  		<Navbar.Brand>Audiophone</Navbar.Brand>
  		<Navbar.Toggle aria-controls="responsive-navbar-nav" />
 		{ getProfile() }
	</Navbar>
);

export default NavbarComponent;