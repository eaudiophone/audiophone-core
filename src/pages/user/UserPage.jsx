import React, { Component } from 'react';

import { RedirectService } from '../../services/RedirectService';
import { UserTableComponent } from './../../components/index';

export class UserPage extends Component {

	constructor( props ) {
		super( props );
		this.state = { redirect: false };
	}

	getHeader() {

		return (
			<div className="d-flex justify-content-start flex-wrap flex-md-nowrap
						align-items-center pb-2 mb-3">
				<h2 className="font-italic">Gestión de usuarios</h2>
			</div>
		);
	}


	render() {

		return (

			<div>
				{ this.state.redirect && ( <RedirectService route="/login" /> ) }
				{ this.getHeader() }
				<UserTableComponent redirect={ () => this.setState({ redirect: true }) } />
			</div>
		);
	}
}
