import React, { Component } from 'react';
import { RedirectService } from '../../services/RedirectService';
import { TitleComponent, ClientsTableComponent } from '../../components/index';

export class ClientsPage extends Component {
	constructor() {
		super();

		this.state = {
			redirect: false
		}

		this.route = '/login'
	}

	render() {
		return (
			<>
				{ this.state.redirect && ( <RedirectService route={ this.route } /> ) }
				<TitleComponent title="Gestion de clientes"></TitleComponent>
				<ClientsTableComponent
					redirect={ ( route = '/login' ) => {
						this.route = route;						
						this.setState({ redirect: true })
					}}
				/>
			</>
		);
	}
}
