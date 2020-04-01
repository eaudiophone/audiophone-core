import React, { Component } from 'react';
import { Col, Form, Row, Button, ButtonGroup } from 'react-bootstrap';
import ModalBudgetComponent from './../../../components/modal/modal-budget/ModalBudgetComponent';

class BudgetRentalContent extends Component {

	constructor( props ) {
		
		super( props );

		this.state = {
			...props.item,
			showModal: false,
		};

		this.props = props;

		this.calculateItem = this.calculateItem.bind( this );
		this.handleChange = this.handleChange.bind( this );
	}

	handleChange( $event ) {
		
		let name = $event.target.name;
		let value = Number( $event.target.value );

		if ( value > 0 ) {
			this.setState({ [name]: value });
		}
	}

	calculateItem() {

		this.setState( ( state ) => {
			return { itemMount: state.costUnit * state.itemQuantity };
		});

		const itemBudget = {
			id: this.state.id,
			item: this.state.item,
			description: this.state.description,
			costUnit: this.state.costUnit,
			itemQuantity: this.state.itemQuantity,
			itemMount: this.state.costUnit * this.state.itemQuantity,
		};

		this.setLocalStorage( itemBudget );
	}

	setLocalStorage( itemBudget ) {

		let arrayLocalStorage = JSON.parse( localStorage.getItem('items') );

		let newArray = arrayLocalStorage.map( ( element ) => {

			if ( element.id === itemBudget.id ) {
				return itemBudget;
			} else {
				return element;
			}
		});

		localStorage.setItem('items', JSON.stringify( newArray ));
	}

	showModal() {
		this.setState({ showModal: true });
	}

	closeModal( data ) {

		if ( data !== null ) {

			const arrayLocalStorage = JSON.parse( localStorage.getItem('items') );

			let newArray = arrayLocalStorage.map( ( element ) => {

				if ( element.id === this.state.id ) {
					return {
						...element,
						item: data.item,
						description: data.description
					}
				} else {
					return element;
				}
			});

			localStorage.setItem('items', JSON.stringify( newArray ));

			return this.setState({ 
				showModal: false, 
				item: data.item,
				description: data.description
			});
		}

		this.setState({ showModal: false });
	}

	deleteItemLocal() {

		const arrayLocalStorage = JSON.parse( localStorage.getItem('items') );

		let newArray = arrayLocalStorage.filter( ( element ) => element.id !== this.state.id );

		localStorage.setItem('items', JSON.stringify( newArray ));

		this.props.deleteItemPage( newArray );
	}

	render() {

		return (

			<div className="mt-4">

				<ModalBudgetComponent.ModalEditBudgetComponent 
						showModal={ this.state.showModal }
						closeModal={ ( data ) => this.closeModal( data ) }
						item={{
							id: this.state.id,
							item: this.state.item,
							description: this.state.description
						}}
				/>

				<Row>

					<Col sm={ 12 }>
						<div className="w-100 d-flex flex-row justify-content-between">
							<h4>Nombre de articulo: { this.state.item }</h4>
							<ButtonGroup size="sm">
								<Button 
									variant="info" 
									className="m-0"
									onClick={ () => this.showModal() }
								>	
									<i className="fas fa-pen mr-2"></i>
									Editar
								</Button>
								<Button 
									variant="danger" 
									onClick={ () => this.deleteItemLocal() }
								>	
									<i className="fas fa-trash mr-2"></i>
									Eliminar
								</Button>
							</ButtonGroup>
						</div>
						<p>{ this.state.description }</p>
					</Col>

					<Col sm={ 6 }>
						<Form.Label>Costo por unidad</Form.Label>
						<Form.Control 
							type="number"  
							onChange={ this.handleChange }
							value={ this.state.costUnit }
							name="costUnit"
							min="0"
						/>
					</Col>

					<Col sm={ 6 }>
						<Form.Label>Cantidad del articulo</Form.Label>
						<Form.Control 
							type="number"  
							onChange={ this.handleChange }
							value={ this.state.itemQuantity }
							name="itemQuantity"
							min="0"
						/>
					</Col>

					<Col sm={ 12 } className="mt-3">
						<Form.Label>Sub-Total:</Form.Label>
						<Form.Control
							type="text"  
							onChange={ this.handleChange }
							value={ this.state.itemMount }
							name="itemMount"
							readOnly
						/>
					</Col>

					<Col sm={ 12 } className="mt-3">
						<Button 
							onClick={ this.calculateItem }
							variant="dark"
						>Calcular SubTotal</Button>
					</Col>

				</Row>

				<hr />
			</div>
		);
	}
}

export default BudgetRentalContent;