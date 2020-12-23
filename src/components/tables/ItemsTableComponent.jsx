import React, { Component, Fragment } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ToastComponent, PaginationComponent, SearchBarComponent } from '../index';
// import { items } from '../../hardcode/ItemsHardcode';

import { ModalItemsComponent } from '../modal/index';
import { ItemService } from '../../services/ItemService';

export class ItemsTableComponent extends Component {

	itemService = new ItemService();

	headerTable = ['Id', 'Nombre:', 'Descripción:', 'Precio:', 'Acciones:' ];
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
		};
	}

	componentDidMount() {
		return this.getAllItems();
	}

	getAllItems( pagination = { start: 1, end: 5 } ) {

		this.itemService.getAllItems( pagination )
			.then( response => {

				return this.setState({
					items: response.items,
					totalItems: response.bdItemsTotal
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

	deleteItem( idItem ) {
		
		if ( idItem ) {

			this.itemService.deleteItem({ apiaudiophoneitems_id: idItem })
				.then( response => {
					
					// console.log( response );

					this.message = response.message;
					this.action = response.action;

					const items = this.state.items.filter(( item ) => item.apiaudiophoneitems_id !== idItem );

					return this.setState({
						showToast: true,
						showModal: false,
						items,
						totalItems: this.state.totalItems - 1
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

	prepareData( type, response ) {

		if ( type === 'delete' ) {
			return this.deleteItem( response );

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
				<td>
					<Button 
						variant="info" 
						size="sm" 
						className="mr-2" 
						onClick={ ( $event ) => this.handleClick( item, 'edit' ) }>
						<FontAwesomeIcon icon="pen" className="point" />
					</Button>
					<Button 
						variant="danger" 
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

		if ( this.state.items.length > 0 ) {
			return (
				<Fragment>
					<Row>
						<Col xs={ 12 } sm={ 10 }>
							<SearchBarComponent sendSearch={ ( search ) => this.sendSearch( search ) } />
						</Col>
						<Col xs={ 12 } sm={ 2 }>
							<div className="w-100 h-100 d-flex justify-content-center flex-row align-items-end">
								<Button variant="success" size="sm" onClick={ ( $event ) => this.handleClick( null, 'new' ) }>
									<FontAwesomeIcon icon="plus" className="mr-2" />
									Nuevo articulo
								</Button>	
							</div>
						</Col>
					</Row>
					<Table className="mt-4" striped responsive hover>
						<thead className="thead-dark">
							<tr>
								{ this.headerTable.map(( columnName, index ) => (
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
					<Button variant="success" size="sm" onClick={ ( $event ) => this.handleClick( null, 'new' ) }>
						<FontAwesomeIcon icon="plus" className="mr-2" />
						Nuevo articulo
					</Button>	
				</Row>
			</Fragment>
		);
	}

	render() {

		return (
			<div>
				{ this.getTable() }
				{ this.state.totalItems > 0 && (
						<Row className="justify-content-center mt-2">
							<PaginationComponent 
								totalRegisters={ this.state.totalItems } 
								send={ ( params ) => this.getAllItems( params ) } 
								pagination={ 5 } 
							/>
						</Row>
					) 
				}
				<ModalItemsComponent 
					showModal={ this.state.showModal }
					closeModal={ ( type, response ) => this.prepareData( type, response ) }
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
