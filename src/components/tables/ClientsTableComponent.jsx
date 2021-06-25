import  React, { Component }  from 'react';
import { SearchBarComponent, ToastComponent, LoadingComponent, PaginationComponent } from '../index';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClientService } from '../../services/ClientService';
import { ModalClientComponent } from '../modal/index';
import { getDateWithHour } from '../../util-functions/date-format';

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

		this.header = ['Id', 'Nombre cliente', 'Numero de Identidad', 'Telefono', 'Creado', 'Acciones'];
		this.limitPagination = 5;
		this.action = '';
		this.message = '';
		this.clientService = new ClientService();
		this.typeModal = '';
	}

	componentDidMount() {
		this.getAllClients();
	}

	getAllClients( pagination = null ) {

		this.clientService.getClients( pagination )
			.then(( response ) => {

				this.setState( response );
			})
			.catch(( error ) => {

				if ( error.status === 401 ) {
					this.props.redirect();

					return;
				}

				// console.log( error );

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

		this.clientService.searchClient( search )
			.then(( response ) => {
				this.setState( response );
			})
			.catch(( error ) => {
				if ( error.status === 401 ) {
					this.props.redirect();

					return;
				}

				// console.log( error );

				this.message = error.message;
				this.action = error.action;

				this.setState({
					showToast: true,
					showModal: false,
					loading: false
				});
			});
	}

	handleClick( client, action ) {

		this.typeModal = action;

		if ( client ) {
			this.setState({ showModal: true, client });

		} else {
			this.setState({ showModal: true });
		}

	}

	dispatchActions( type, response ) {

		if ( type === 'new' ) {
			this.newClient( response );

		} else if ( type === 'edit' ) {
			this.editClient( response );

		} else {
			this.setState({ showModal: false });

		}
	}

	newClient({ actions, values }) {

		this.clientService.createClient( values )
			.then(( response ) => {

				actions.setSubmitting( false );

				this.message = response.message;
				this.action = 'Exito';

				this.setState({
					showModal: false,
					showToast: true,
					clients: this.state.clients.length < this.limitPagination ?
						this.state.clients.concat([ response.client ]) : this.state.clients,
					totalClients: this.state.totalClients + 1
				});
			})
			.catch(( error ) => {

				if ( error.status === 401 ) {
					this.props.redirect();

					return;
				}

				// console.log( error );

				this.message = error.message;
				this.action = error.action;

				this.setState({
					showToast: true,
					showModal: false
				});

			});
	}

	editClient({ actions, values }) {

		this.clientService.updateClients( values )
			.then(( response ) => {

				// console.log( response );

				actions.setSubmitting( false );

				this.message = response.message;
				this.action = 'Exito';

				this.setState({
					showModal: false,
					showToast: true,
					clients: this.state.clients.map(( client ) => {

						if ( client.apiaudiophoneclients_id === response.clientUpdate.apiaudiophoneclients_id ) {
							return response.clientUpdate;
						}

						return client;
					})
				});
			})
			.catch(( error ) => {

				if ( error.status === 401 ) {
					this.props.redirect();

					return;
				}

				// console.log( error );

				this.message = error.message;
				this.action = error.action;

				this.setState({
					showToast: true,
					showModal: false
				});
			})
	}

	showBalance( client ) {
		sessionStorage.setItem('clientBalance', JSON.stringify( client ));
		this.props.redirect('/clients/balance/' + client.apiaudiophoneclients_id );
	}

	setRows( client ) {

		if ( this.state.clients.length > 0 ) {

			return this.state.clients.map(( client, index ) => (
				<tr className="text-center" key={ client.apiaudiophoneclients_id }>
					<td>{ client.apiaudiophoneclients_id }</td>
					<td>{ client.apiaudiophoneclients_name }</td>
					<td>{ client.apiaudiophoneclients_ident }</td>
					<td>{ client.apiaudiophoneclients_phone }</td>
					<td>{ getDateWithHour( client.created_at ) }</td>
					<td>
						<Button
							variant="primary"
							size="sm"
							onClick={ ( $event ) => this.handleClick( client, 'edit' ) }
							className="mr-2"
						>
							<FontAwesomeIcon icon="pen" className="point" />
						</Button>
						<Button
							variant="secondary"
							size="sm"
							onClick={ () => this.showBalance( client ) }
						>
							<FontAwesomeIcon icon="file-alt" className="point" />
						</Button>
					</td>
				</tr>
			));

		} else {

			return (
				<tr className="text-center">
					<td colSpan={ 6 } className="text-danger">
						No existen registros de clientes disponibles
					</td>
				</tr>
			);
		}

	}

	showPagination() {

		if ( this.state.clients.length > 0 ) {

			return (
				<Row className="justify-content-center mt-2">
					<PaginationComponent
						totalRegisters={ this.state.totalClients }
						send={ ( params ) => this.getAllClients( params ) }
						pagination={ 5 }
					/>
				</Row>
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
					client={ this.state.client }
					action={ this.typeModal }
				/>
				{ this.state.loading && ( <LoadingComponent /> ) }
				{ !this.state.loading && (
					<>
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
						{ this.showPagination() }
					</>
					)
				}
			</>
		);
	}
}
