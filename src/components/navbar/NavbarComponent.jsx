import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import './NavbarComponent.css';

const getMenu = () => (

	<Navbar.Collapse 
		id="responsive-navbar-nav"
		className="justify-content-end"
	>
		<Nav>
			<Nav.Link>Notificaciones</Nav.Link>
			<Nav.Link href="/home/profile">Perfil</Nav.Link>
			<Nav.Link href="/">Salir</Nav.Link>
		</Nav>
	</Navbar.Collapse>
);

const NavbarComponent = () => (

	<Navbar 
		collapseOnSelect 
		expand="sm" 
		bg="light" 
		variant="light"
		sticky="top"
	>	
  		<Navbar.Brand>Audiophone</Navbar.Brand>
  		<Navbar.Toggle aria-controls="responsive-navbar-nav" />
 		{ getMenu() }
	</Navbar>
);

export default NavbarComponent;