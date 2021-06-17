import  React, { Component }  from 'react';
import { SearchBarComponent } from '../index';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class ClientsTableComponent extends Component {
	constructor() {
		super();

		this.state = {
			clients: [],  
			totalClients: 0,
			client: {},
			showToast: false,
			showModal: false,
			loading: true
		}

		this.header = ['Id', 'Nombre cliente', 'Numero de Identidad', 'Telefono', 'Acciones'];
		this.limitPagination = 5;
		this.action = '';
		this.message = '';
	}

	searchClient( search ) {
		console.log( search );
	}

	handleClick( client, action ) {
		console.log( client, action );
	}

	setRows( client ) {
		
		if ( this.state.clients.length > 0 ) {

			return this.state.clients.map(( client, index ) => (
				<tr className="text-center" key={ client.apiaudiophoneclients_id }>
					<td>{ client.apiaudiophoneclients_id }</td>
					<td>{ client.apiaudiophoneclients_name }</td>
					<td>{ client.apiaudiophoneclients_ident }</td>
					<td>{ client.apiaudiophoneclients_phone }</td>
					<td>
						<Button
							variant="info"
							size="sm"
							onClick={ ( $event ) => this.handleClick( client, 'edit' ) }
						>
							<FontAwesomeIcon icon="pen" className="point" />
						</Button>
					</td>
				</tr>
			));

		} else {

			return (
				<tr className="text-center">
					<td colSpan={ 5 } className="text-danger">
						No existen registros de clientes disponibles
					</td>
				</tr>
			);
		}

	}

	render() {
		return (
			<>	
				<SearchBarComponent sendSearch={ ( stringSearch ) => this.searchClient( stringSearch ) } />
				<Table className="mt-4" striped hover responsive>
					<thead className="thead-dark">
						<tr className="text-center">
							{ this.header.map(( name, index ) => ( <th key={ index }>{ name }</th> )) }
						</tr>
					</thead>
					<tbody>{ this.setRows() }</tbody>
				</Table>
			</>
		);
	}
}
