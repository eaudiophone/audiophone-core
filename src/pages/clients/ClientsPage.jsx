import React, { Component } from 'react';
import { RedirectService } from '../../services/RedirectService';
import { TitleComponent, ClientsTableComponent } from '../../components/index';

export class ClientsPage extends Component {
	constructor() {
		super();

		this.state = {
			redirect: false
		}
	}

	render() {
		return (
			<>
				{ this.state.redirect && ( <RedirectService route="/login" /> ) }
				<TitleComponent title="Gestion de clientes"></TitleComponent>
				<ClientsTableComponent 
					redirect={ () => this.setState({ redirect: true }) } 
				/>
			</>
		);
	}
}