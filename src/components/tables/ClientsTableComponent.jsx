import  React, { Component }  from 'react';
import { SearchBarComponent, ToastComponent } from '../index';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClientService } from '../../services/ClientService';
import { ModalClientComponent } from '../modal/index';

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
		this.clientService = new ClientService();
		this.typeModal = '';
	}

	componentDidMount() {
		this.getAllClients();
	}

	getAllClients() {
		
		this.clientService.getClients()
			.then(( response ) => {

				console.log( response );

				this.setState({
					loading: false
				});
			})
			.catch(( error ) => {

				if ( error.status === 401 ) {
					this.props.redirect();

					return;
				}

				console.log( error );

				this.message = error.message;
				this.action = error.action;

				this.setState({
					showToast: true,
					showModal: false,
					loading: false
				});
			});
	}


	searchClient( search ) {
		console.log( search );
	}

	handleClick( client, action ) {
		
		this.typeModal = action;

		console.log( client );

		this.setState({ showModal: true });
	}

	dispatchActions( type, response ) {
		
		if ( type === 'new' ) {
			// return this.activateItem( response );

		} else if ( type === 'edit' ) {
			// return this.newItem( response );

		} else {
			return this.setState({ showModal: false });
		
		}
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
				<ToastComponent 
					showToast={ this.state.showToast } 
					content={ this.message } 
					context={ this.action }
					onHide={ () => this.setState({ showToast: false }) }
				/>
				<ModalClientComponent 
					showModal={ this.state.showModal }
					closeModal={ ( type, response ) => this.dispatchActions( type, response ) }
					item={ this.state.client }
					action={ this.typeModal }
				/>
				<Row>
					<Col xs={ 12 } sm={ 10 }>
						<SearchBarComponent sendSearch={ ( stringSearch ) => this.searchClient( stringSearch ) } />
					</Col>
					<Col xs={ 12 } sm={ 2 } className="align-self-end text-center mt-3 mt-md-0">
						<Button variant="success" className="reset-button" size="sm"
							onClick={ ( $event ) => this.handleClick( null, 'new' ) }>
							<FontAwesomeIcon icon="plus" className="mr-2" />
							Nuevo cliente
						</Button>
					</Col>
				</Row>
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
