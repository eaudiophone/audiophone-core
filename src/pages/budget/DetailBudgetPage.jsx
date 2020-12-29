import React, { Component, Fragment } from 'react';
import { EventService } from '../../services/EventService';
import { ItemService } from '../../services/ItemService';
import { LoadingComponent } from '../../components/index';
import { BudgetFormComponent } from '../../components/form/budget-form/BudgetFormComponent';
import { Table, Row, Col } from 'react-bootstrap';
import { getSpanishFormatDate } from '../../util-functions/date-format';
import { RedirectService } from '../../services/RedirectService';
import { ModalSelectItemsComponent } from '../../components/modal/index';

export class DetailBudgetPage extends Component {

	headerTable = ['Id', 'Nombre', 'Descripción', 'Cantidad', 'Precio unitario', 'Subtotal', 'Acciones'];
	eventService = new EventService();
	itemService = new ItemService();
	event = {};
	itemsSelected = [];

	constructor( props ) {
		super( props );

		this.state = {
			items: [],
			showToast: false,
			loading: true,
			redirect: false,
			showModal: false,
			totalBudget: 0,
			totalItems: 0
		};
	}

	componentDidMount() {

		const idEvent = Number( this.props.match.params.id );
		
		this.eventService.getEvent( idEvent )
			.then( event => { 
				this.event = event
				return this.setState({ loading: false }); 
			})
			.catch( error => {

				if ( error.status === 401 ) {
					return this.setState({ redirect: true });
				}

				this.message = error.message;
				this.action = error.action;
					
				return this.setState({ showToast: true });
			});
	}

	openModal() {

		this.itemService.getAllItems({ start: 0, end: 5 })
			.then( response => {
				return this.setState({
					items: response.items,
					totalItems: response.bdItemsTotal,
					showModal: true
				});
			})
			.catch( error => {

				if ( error.status === 401 ) {
					return this.setState({ redirect: true });
				}

				this.message = error.message;
				this.action = error.action;

				return this.setState({ showToast: true, showModal: false });
			});

	}

	addItem( itemsSelected = [] ) {

		if ( !itemsSelected ) {
			return this.setState({ showModal: false });
		}

		let price = 0;
		this.itemsSelected = itemsSelected;

		console.log( itemsSelected );
		
		// realiza el calculo del total
		this.itemsSelected.forEach(( item ) => price += item.apiaudiophoneitems_price );

		return this.setState({ 
			showModal: false,
			totalBudget: price 
		});
	}

	removeItem() {
		console.log('removeItem');
	}

	generateBudget( form ) {
		console.log( form );
	}

	// paginacion de la tabla del modal
	getItems( pagination = { start: 1, end: 5 } ) {

		this.itemService.getAllItems( pagination )
			.then( response => {
				return this.setState({
					items: response.items,
					// totalItems: response.bdItemsTotal,
				});
			})
			.catch( error => {

				if ( error.status === 401 ) {
					return this.setState({ redirect: true, showModal: false });
				}

				this.message = error.message;
				this.action = error.action;

				return this.setState({ showToast: true, showModal: false });
			});
	}

	getTable() {
		return (
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
					{ this.itemsSelected.map(( item ) => (
							<tr className="text-center" key={ item.apiaudiophoneitems_id }>
								<td>{ item.apiaudiophoneitems_id }</td>
								<td>{ item.apiaudiophoneitems_name }</td>
								<td>{ item.apiaudiophoneitems_description }</td>
								<td></td>
								<td>{ item.apiaudiophoneitems_price }</td>
								<td></td>
								<td></td>
							</tr>
						)) 
					}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan="7" className="text-right">
							Total a pagar: 
							<b className="ml-2">{ this.state.totalBudget }$</b>
						</td>
					</tr>
				</tfoot>
			</Table>
		);
	}

	showDetails() {
		return (
			<Col xs={ 12 } md={ 6 }>
				<h3>Detalles del Presupuesto</h3>
				<p>
					<b className="mr-2">
						Nombre del evento: 
					</b> { this.event.apiaudiophonevents_title } <br />
					<b className="mr-2">Tipo de presupuesto: </b> { Number( this.event.id_apiaudiophoneservices ) === 1 ? 'Alquiler' : 'Grabación' }
					<br />
					<b className="mr-2">Fecha: </b> { getSpanishFormatDate( new Date().toISOString() ) }
				</p>
			</Col>
		);
	}

	showInfo() {
		return (
			<Col xs={ 12 } md={ 6 }>
				<h2 className="mb-3">Estudios Audiophone S.A</h2>
				<p>
					Avenida Principal El Manicomio, <br />
					Esquina Trinchera, Casa #152 <br />
					Caracas - Venezuela <br />
					Telefonos: 0212-862-34-92 0416-905-57-06 <br />
					Email: eaudiophonesa@gmail.com <br />
				</p>	
			</Col>
		);
	}

	showContent() {

		if ( !this.state.loading ) {
			return ( 
				<Fragment>
					<Row className="p-3">
						{ this.showInfo() }
						{ this.showDetails() }
						<BudgetFormComponent 
							children={ this.getTable() } 
							openModal={ () => this.openModal() }
							generateBudget={ ( form ) => this.generateBudget( form ) }
							itemsLength={ this.itemsSelected.length }
						/> 
					</Row>
				</Fragment>
			);
		}

		return ( <LoadingComponent /> );
	}

	render() {

		return (
			<Fragment>
				{ this.state.redirect && ( <RedirectService route="/login" /> ) }
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap 
						align-items-center pb-2 mb-3 border-bottom">
					<h2>Presupuesto de servicios: </h2>
				</div>
				{ this.showContent() }
				<ModalSelectItemsComponent 
					showModal={ this.state.showModal }
					items={ this.state.items }
					totalItems={ this.state.totalItems }
					pagination={ ( pagination ) => this.getItems( pagination ) }
					closeModal={ ( itemsSelected ) => this.addItem( itemsSelected ) }
				/>
			</Fragment>
		);
	}
}