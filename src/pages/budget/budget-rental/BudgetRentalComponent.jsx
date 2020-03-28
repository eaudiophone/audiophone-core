import React, { Component } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';

class BudgetRentalContent extends Component {

	constructor( props ) {
		super( props );

		this.state = {	
			costUnit: 0,
			itemQuantity: 0,
			itemMount: 0
		};

		this.item = props.item;

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
			...this.item,
			costUnit: this.state.costUnit,
			itemQuantity: this.state.itemQuantity,
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

	render() {

		return (

			<div className="mt-4">
				<Row>

					<Col sm={ 12 }>
						<h4>Nombre de articulo: { this.item.item }</h4>
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