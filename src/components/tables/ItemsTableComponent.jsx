import React, { Component, Fragment } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	ToastComponent,
	PaginationComponent,
	SearchBarComponent,
	LoadingComponent
} from '../index';

import { ModalItemsComponent } from '../modal/index';
import { ItemService } from '../../services/ItemService';

export class ItemsTableComponent extends Component {

	itemService = new ItemService();
	action = '';
	message = '';
	typeModal = '';
	limitPagination = 5;

	constructor( props ) {
		super( props );

		this.state = {
			items: [],
			totalItems: 0,
			item: {},
			showToast: false,
			showModal: false,
			loading: true
		};
	}

	componentDidMount() {
		return this.getAllItems();
	}

	getAllItems( pagination = { start: 1, end: 15 } ) {

		this.itemService.getAllItems( pagination )
			.then( response => {

				return this.setState({
					items: response.items,
					totalItems: response.bdItemsTotal,
					loading: false
				});

			})
			.catch( error => {

				if ( error.status === 401 ) {
					return this.props.redirect();
				}

				this.message = error.message;
				this.action = error.action;

				return this.setState({
					showToast: true,
					showModal: false,
					loading: false
				});
			});
	}

	editItem({ actions, values }) {

		actions.setSubmitting( true );

		values = {
			...values,
			apiaudiophoneitems_id: this.state.item.apiaudiophoneitems_id
		};

		this.itemService.updateItem( values )
			.then( response => {

				actions.setSubmitting( false );

				const items = this.state.items.map(( item ) => {

					if ( item.apiaudiophoneitems_id === response.item.apiaudiophoneitems_id ) {
						return response.item;
					}

					return item;
				});

				this.message = response.message;
				this.action = response.action;

				return this.setState({
					showModal: false,
					items,
					showToast: true
				});
			})
			.catch( error => {

				actions.setSubmitting( false );

				if ( error.status === 401 ) {
					return this.props.redirect();
				}

				this.message = error.message;
				this.action = error.action;

				return this.setState({ showToast: true, showModal: false });
			});
	}

	activateItem( item ) {

		if ( item ) {

			this.itemService.changeStatus( item )
				.then( response => {

					this.message = response.message;
					this.action = response.action;

					const items = this.state.items.map(( item ) => {

						if ( item.apiaudiophoneitems_id === response.itemUpdate.apiaudiophoneitems_id ) {
							return response.itemUpdate;
						}

						return item;
					});

					return this.setState({
						showToast: true,
						showModal: false,
						items
					});

				})
				.catch( error => {

					if ( error.status === 401 ) {
						return this.props.redirect();
					}

					this.message = error.message;
					this.action = error.action;

					return this.setState({ showToast: true, showModal: false });
				});
		}

		return this.setState({ showModal: false });
	}

	newItem({ values, actions }) {

		actions.setSubmitting( true );

		this.itemService.createItem( values )
			.then( resp => {

				this.action = resp.action;
				this.message = resp.message;

				actions.setSubmitting( false );

				return this.setState({
					showModal: false,
					showToast: true,
					items: this.state.items.length < this.limitPagination ?
						this.state.items.concat([ resp.item ]) : this.state.items,
					totalItems: this.state.totalItems + 1
				});
			})
			.catch( error => {

				if ( error.status === 401 ) {
					return this.props.redirect();
				}

				this.message = error.message;
				this.action = error.action;

				actions.setSubmitting( false );

				return this.setState({ showToast: true, showModal: false });
			});

	}

	sendSearch( search = '' ) {

		this.itemService.searchItem( search )
			.then( response => {

				return this.setState({
					items: response.items
				});

			})
			.catch( error => {

				if ( error.status === 401 ) {
					return this.props.redirect();
				}

				this.message = error.message;
				this.action = error.action;

				return this.setState({ showToast: true, showModal: false });
			});
	}

	handleClick( item, type ) {

		this.typeModal = type;

		return this.setState({ showModal: true, item });
	}

	dispatchActions( type, response ) {

		if ( type === 'delete' ) {
			return this.activateItem( response );

		} else if ( type === 'new' ) {
			return this.newItem( response );


		} else if ( type === 'edit' ) {
			return this.editItem( response );

		} else {
			return this.setState({ showModal: false });
		}
	}

	setData() {

		return this.state.items.map(( item, index ) => (
			<tr key={ item.apiaudiophoneitems_id } className="text-center">
				<td>{ item.apiaudiophoneitems_id }</td>
				<td>{ item.apiaudiophoneitems_name }</td>
				<td>{ item.apiaudiophoneitems_description }</td>
				<td>{ item.apiaudiophoneitems_price }</td>
				<td>{ item.apiaudiophoneitems_status === 'ACTIVO' ?
					( <FontAwesomeIcon icon="check" className="text-success" /> ) :
					( <FontAwesomeIcon icon="times" className="text-danger" /> ) }
				</td>
				<td>
					<Button
						variant="primary"
						size="sm"
						className="mr-2"
						onClick={ ( $event ) => this.handleClick( item, 'edit' ) }>
						<FontAwesomeIcon icon="pen" className="point" />
					</Button>
					<Button
						variant="secondary"
						size="sm"
						onClick={ ( $event ) => this.handleClick( item, 'delete' ) }
					>
						<FontAwesomeIcon icon="trash" className="point" />
					</Button>
				</td>
			</tr>
		));
	}

	getTable() {

		const headerTable = ['Id', 'Nombre:', 'Descripción:', 'Precio por servicio:', 'Estado', 'Acciones:' ];

		if ( this.state.items.length > 0 ) {
			return (
				<Fragment>
					<Row>
						<Col xs={ 12 } sm={ 10 }>
							<SearchBarComponent sendSearch={ ( search ) => this.sendSearch( search ) } />
						</Col>
						<Col xs={ 12 } sm={ 2 } className="align-self-end text-center mt-3 mt-md-0">
							<Button variant="success" className="reset-button" size="sm"
								onClick={ ( $event ) => this.handleClick( null, 'new' ) }>
								<FontAwesomeIcon icon="plus" className="mr-2" />
								Nuevo articulo
							</Button>
						</Col>
					</Row>
					<Table className="mt-4" striped responsive hover>
						<thead className="thead-dark">
							<tr>
								{ headerTable.map(( columnName, index ) => (
										<th key={ index } className="text-center">{ columnName }</th>
									))
								}
							</tr>
						</thead>
						<tbody>
							{ this.setData() }
						</tbody>
					</Table>
				</Fragment>
			);
		}

		return (
			<Fragment>
				<p className="text-center text-danger mb-4">
					No hay articulos disponibles que mostrar. <br />
				</p>
				<Row className="justify-content-center">
					<Button variant="success" size="sm" className="reset-button"
						onClick={ ( $event ) => this.handleClick( null, 'new' ) }>
						<FontAwesomeIcon icon="plus" className="mr-2" />
						Nuevo articulo
					</Button>
				</Row>
			</Fragment>
		);
	}

	showContent() {

		if ( !this.state.loading ) {
			return this.getTable();
		}

		return ( <LoadingComponent /> );
	}

	render() {

		return (
			<div>
				{ this.showContent() }
				{ this.state.totalItems > 0 && (
						<PaginationComponent
							totalRegisters={ this.state.totalItems }
							send={ ( params ) => this.getAllItems( params ) }
							pagination={ 15 }
						/>
					)
				}
				<ModalItemsComponent
					showModal={ this.state.showModal }
					closeModal={ ( type, response ) => this.dispatchActions( type, response ) }
					item={ this.state.item }
					action={ this.typeModal }
				/>
				<ToastComponent
					showToast={ this.state.showToast }
					content={ this.message }
					context={ this.action }
					onHide={ () => this.setState({ showToast: false }) }
				/>
			</div>
		);
	}
}
