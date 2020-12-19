import React, { Component, Fragment } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ToastComponent, PaginationComponent, SearchBarComponent, SearchFilterComponent } from '../index';
// import { items } from '../../hardcode/ItemsHardcode';

import { ModalItemsComponent } from '../modal/index';

export class ItemsTableComponent extends Component {

	headerTable = [ 'Id:', 'Nombre:', 'Descripción:', 'Precio:', 'Creado:', 'Actualizado:' ];
	action = '';
	message = '';
	typeModal = '';

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

	editItem( item ) {
		
		console.log( item );

		this.setState({ showModal: false });
	}

	deleteItem( idItem ) {

		if ( !idItem ) {
			return this.setState({ showModal: false });
		}

		console.log( idItem );

		return this.setState({ showModal: false });
	}

	sendSearch( search = '' ) {
		console.log( search );
	}

	getPagination( params ) {
		console.log( params );
	}

	filterSearch( filter ) {
		console.log( filter );
	}

	handleClick( item, type ) {
		
		this.typeModal = type;
		return this.setState({ showModal: true, item });
	}

	prepareData( type, response ) {

		if ( type === 'delete' ) {
			
			return this.deleteItem( response );

		} else if ( type === 'new' ) {

			return this.setState({ showModal: false });

		} else if ( type === 'edit' ) {

			return this.editItem( response );

		} else {

			return this.setState({ showModal: false });
		}
	}

	setData() {
		return this.state.items.map(( item ) => (
			<tr key={ item.id } className="text-center">
				<td>{ item.id }</td>
				<td>{ item.name }</td>
				<td>{ item.quantity }</td>
				<td>{ item.price }</td>
				<td>
					<FontAwesomeIcon 
						icon={ item.state ? 'check' : 'times' } 
						className={ item.state ? 'success' : 'danger' } 
					/>
				</td>
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
						<Col xs={ 12 } className="mb-10" sm={ 5 }>
							<SearchFilterComponent filterSearch={ ( filter ) => this.filterSearch( filter ) } />
						</Col>
						<Col xs={ 12 } sm={ 5 }>
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
					<Row className="justify-content-center">
						<PaginationComponent 
							totalRegisters={ this.state.totalItems } 
							send={ ( params ) => this.getPagination( params ) } 
							pagination={ 5 } 
						/>
					</Row>
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
