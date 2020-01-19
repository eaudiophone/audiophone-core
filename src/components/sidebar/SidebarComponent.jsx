import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { MENU } from './SidebarHardcode';
import './SidebarComponent.css';

class SidebarComponent extends Component {

	constructor( props ) {
		
		super( props );

		this.menu = [];

		this.checkUser();
	}

	checkUser() {

		if ( this.props.admin === 'ADMIN_ROLE' ) {

			this.menu = MENU.admin;
						
		} else {

			this.menu = MENU.user;
		} 
	}

	getMenu() {

		return this.menu.map( ( element ) => ( 
          				
          	<li 
          		key={ element.id } 
          		className="nav-item"
          	>
          		<Link 
          			to={ element.link } 
          			className="nav-link"
          		>
          			<i className={ element.icon }></i>
          			{ element.name }
          		</Link>
          	</li>

        ));
	}

	render() {

		return (

			<div className="bg-dark sidebar">
				<div className="sidebar-sticky">
					<h6>Gestionar Eventos</h6>
					{ this.getMenu() }
					<h6>Información</h6>
					<li>
						<Link to="/home/info" className="nav-link">
          					<i className="fas fa-info-circle"></i>
          					Info
          				</Link>
					</li>
				</div>
			</div>
		);
	}
}

export default SidebarComponent;