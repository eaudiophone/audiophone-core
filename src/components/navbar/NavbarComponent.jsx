import React, { Component, Fragment } from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RedirectService } from '../../services/RedirectService';

import { AuthService } from './../../services/AuthService';
import LogoEA from '../../images/EA_blanco.svg';

import './NavbarComponent.css';

class NavbarComponent extends Component {

	authService = new AuthService();

	constructor( props ) {
	  super( props );

		this.state = { redirect: false };
		this.logOut = this.logOut.bind( this );
	}

	validateProfile() {

		if ( this.props.role === 'ADMIN_ROLE' ) {

			return (
				<NavDropdown title="Gestion">
					<Link className="dropdown-item" to="/day">Dias de servicios</Link>
					<Link className="dropdown-item" to="/users">Usuarios</Link>
					<Link className="dropdown-item" to="/items">Articulos</Link>
					<Link className="dropdown-item" to="/clients">Clientes</Link>
					<Link className="dropdown-item" to="/budget">Presupuestos</Link>
				</NavDropdown>
			);

		}
	}

	getProfile() {

		return (
  		<Navbar.Collapse id="responsive-navbar-nav">
  			<Nav className="w-100 justify-content-end">
  				{ this.props.role === 'ADMIN_ROLE' &&
  					<Link className="nav-link" to="/events-admin">Eventos</Link>
  				}
  				{ this.validateProfile() }
  				<Link to="/profile" className="nav-link">Perfil</Link>
  				<Nav.Link href="#" onSelect={ () => this.logOut() }>
  					Salir
  				</Nav.Link>
  			</Nav>
  		</Navbar.Collapse>
		);

	}

	render() {

		return (
			<Fragment>
				{ this.state.redirect && ( <RedirectService route="/login" /> ) }
				<Navbar
					collapseOnSelect
					expand="sm"
					bg="dark"
					variant="dark"
					sticky="top"
				>
			  		<Navbar.Brand>
							<img src={ LogoEA } alt="logo_EA" />
							Audiophone
						</Navbar.Brand>
			  		<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			 		{ this.getProfile() }
				</Navbar>
			</Fragment>
		);

	}

	logOut() {
		this.authService.logOut();
		return this.setState({ redirect: true });
	}
}

export default NavbarComponent;
