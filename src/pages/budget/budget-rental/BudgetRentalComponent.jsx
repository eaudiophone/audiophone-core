import React, { Component } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import ModalBudgetComponent from './../../../components/modal/modal-budget/ModalBudgetComponent';

class BudgetRentalContent extends Component {

	constructor( props ) {
		
		super( props );

		this.state = {
			id: props.id,
			item: props.item || '',
			description: props.description || '',
			costUnit: 0,
			itemQuantity: 0,
			itemMount: 0,
			showModal: false
		};

		this.item = props.item;
		this.props = props;

		this.calculateItem = this.calculateItem.bind( this );
		this.handleChange = this.handleChange.bind( this );
	}

	handleChange( $event ) {
		
		let name = $event.target.name;
		let value = $event.target.value;

		if ( value > 0 ) {
			this.setState({ [name]: value });
		}
	}

	calculateItem() {

		this.setState( ( state ) => {
			return { itemMount: state.costUnit * state.itemQuantity };
		});

		const itemBudget = {
			...this.state,
			itemMount: this.state.costUnit * this.state.itemQuantity
		};

		this.setLocalStorage( itemBudget );
	}

	setLocalStorage( itemBudget ) {

		let arrayLocalStorage = JSON.parse( localStorage.getItem('items') ) || [];

		if ( arrayLocalStorage.length > 0 ) {

			let found = arrayLocalStorage.find( ( element ) => element.item === itemBudget.item );

			if ( found ) {

				let index = arrayLocalStorage.indexOf( found );
				arrayLocalStorage[index] = itemBudget;

			} else {

				arrayLocalStorage.push( itemBudget );
			}

		} else {

			arrayLocalStorage.push( itemBudget );
		}
		
		localStorage.setItem('items', JSON.stringify( arrayLocalStorage ));
	}

	showModal( item ) {
		this.setState({ showModal: true });
	}

	closeModal( data ) {
		this.setState({ showModal: false });
	}

	render() {

		return (

			<div className="mt-4">

				<ModalBudgetComponent.ModalEditBudgetComponent 
						showModal={ this.state.showModal }
						closeModal={ ( data ) => this.closeModal( data ) }
						item={{
							id: this.props.id,
							item: this.item.item,
							description: this.item.description
						}}
				/>

				<Row>

					<Col sm={ 12 }>
						<div className="w-100 d-flex flex-row justify-content-between">
							<h4>{ this.props.id }.- Nombre de articulo: { this.item.item }</h4>
							<Button 
								variant="dark" 
								size="sm"
								onClick={ () => this.showModal({  
									item: this.item.item,
									description: this.item.description
								}, this.props.id ) }
							>	
								<i className="fas fa-pen mr-2"></i>
								Editar
							</Button>
						</div>
						<p>{ this.item.description }</p>
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
							variant="info"
						>Calcular SubTotal</Button>
					</Col>

				</Row>

				<hr />
			</div>
		);
	}
}

export default BudgetRentalContent;