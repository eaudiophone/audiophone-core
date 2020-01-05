import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { MENU } from './Sidebar-hardcode';
import './Sidebar.css';

class Sidebar extends Component {

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

		return (

			<ul className="nav flex-column">
          		
          		{ this.menu.map( ( element ) => {

          			return ( 
          				
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

          				)
          			}) 
          		}
          		<h6>Información</h6>
          		<li className="nav-item">
          			<Link className="nav-link" to="/home/info">
          				<i className="fas fa-info-circle"></i>
          				Info
          			</Link>
          		</li>
          	</ul>

		); 
	}


	render() {

		return (

			<div className="bg-dark sidebar">
				<div className="sidebar-sticky">
					<h6>Gestionar servicios</h6>
					{ this.getMenu() }
				</div>
			</div>
		);
	}
}

export default Sidebar;