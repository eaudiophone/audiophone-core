import React, { Component, Fragment, useState } from 'react';
import { EventService } from '../../services/EventService';
import { ItemService } from '../../services/ItemService';
import { LoadingComponent } from '../../components/index';
import { BudgetFormComponent } from '../../components/form/budget-form/BudgetFormComponent';
import { Table, Row, Col, Button } from 'react-bootstrap';
import { getSpanishFormatDate } from '../../util-functions/date-format';
import { RedirectService } from '../../services/RedirectService';
import { ModalSelectItemsComponent } from '../../components/modal/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class DetailBudgetPage extends Component {

	headerTable = ['Id', 'Nombre', 'Descripción', 'Cantidad', 'Precio unitario', 'Subtotal', 'Acciones'];
	eventService = new EventService();
	itemService = new ItemService();
	event = {};

	constructor( props ) {
		super( props );

		this.state = {
			items: [],
			showToast: false,
			loading: true,
			redirect: false,
			showModal: false,
			totalBudget: 0,
			totalItems: 0,
			itemsSelected: []
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
					items: response.items || [],
					totalItems: response.bdItemsTotal || 0,
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

		// se añaden los campos faltantes
		itemsSelected = itemsSelected.map(( item ) => ({
			...item,
			apiaudiophonebudgets_items_quantity: 1,
			apiaudiophonebudgets_items_subtotal: item.apiaudiophoneitems_price * 1
		}));

		let price = 0;
		
		// realiza el calculo del total
		itemsSelected.forEach(( item ) => price += item.apiaudiophonebudgets_items_subtotal );

		return this.setState({
			itemsSelected, 
			showModal: false,
			totalBudget: price 
		});
	}

	removeItem( item ) {

		let price = 0;

		let newArray = this.state.itemsSelected.filter(
			( itemSelected ) => item.apiaudiophoneitems_id !== itemSelected.apiaudiophoneitems_id 
		);

		// realiza el calculo del total
		newArray.forEach(( item ) => price += item.apiaudiophoneitems_price );

		return this.setState({
			itemsSelected: newArray,
			totalBudget: price 
		});
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

	// maneja el calculo del subtotal
	handleChange( value, idItem ) {

		console.log( value );
		console.log( idItem );
		
		let newPrice = 0;

		let arrayItems = this.state.itemsSelected.map(( item ) => {

			if ( item.apiaudiophoneitems_id === idItem ) {
				return {
					...item,
					apiaudiophonebudgets_items_quantity: Number( value ),
					apiaudiophonebudgets_items_subtotal: item.apiaudiophoneitems_price * value 
				}
			}

			return item;
		});

		arrayItems.forEach(( item ) => newPrice += item.apiaudiophonebudgets_items_subtotal );

		return this.setState({
			itemsSelected: arrayItems,
			totalBudget: newPrice
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
					{ this.state.itemsSelected.length > 0 && this.state.itemsSelected.map(( item ) => (
							<tr className="text-center" key={ item.apiaudiophoneitems_id }>
								<td>{ item.apiaudiophoneitems_id }</td>
								<td>{ item.apiaudiophoneitems_name }</td>
								<td>{ item.apiaudiophoneitems_description }</td>
								<td>
									<InputQuantity 
										changeQuantity={ ( value, idItem ) => this.handleChange( value, idItem ) }
										item={ item }
									/>
								</td>
								<td>{ item.apiaudiophoneitems_price }</td>
								<td>{ item.apiaudiophonebudgets_items_subtotal }</td>
								<td>
									<Button size="sm" variant="danger" onClick={ () => this.removeItem( item ) }>
										<FontAwesomeIcon icon="trash" />
									</Button>
								</td>
							</tr>
						)) 
					}
					{	this.state.itemsSelected.length === 0 && (
							<tr className="text-center">
								<td colSpan="7">No hay articulos agregados</td>
							</tr>
						)
					}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan="7" className="text-right">
							Total a pagar: 
							<b className="ml-2">{ this.state.totalBudget.toFixed( 2 ) }$</b>
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
							itemsLength={ this.state.itemsSelected.length }
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

// componente de control de cantidad del formulario
const InputQuantity = ( props ) => {

	const { item, changeQuantity } = props;

	// hooks
	const [ value, setValue ] = useState( item.apiaudiophonebudgets_items_quantity );

	const handleChange = ( val, idItem ) => {
		
		setValue( Number( val ) < 1 || Number( val ) > 9999  ? 1 : Number( val ) );

		return changeQuantity( 
			Number( val ) < 1 || Number( val ) > 9999 ? 1 : Number( val ), 
			idItem 
		);
	}

	return (
		<input 
			type="number" 
			min="1" 
			max="9999" 
			onChange={ ( $event ) => handleChange( $event.target.value, item.apiaudiophoneitems_id ) } 
			value={ value }
		/>
	);
}