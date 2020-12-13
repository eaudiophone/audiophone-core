import React, { Component, Fragment } from 'react';
import { ItemsTableComponent } from '../../components/index';
import { RedirectService } from '../../services/RedirectService';

export class ItemsPage extends Component {

	constructor( props ) {
		super( props );

		this.state = { redirect: false };
	}

	render() {

		return (
			<Fragment>
				{ this.state.redirect && ( <RedirectService route="/login" /> ) }

				<div className="d-flex justify-content-start flex-wrap flex-md-nowrap 
							align-items-center pb-2 mb-3 border-bottom">
					<h2>Gestión de articulos</h2>	
				</div>
				<ItemsTableComponent />
			</Fragment>
		); 
	}
}