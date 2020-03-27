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

		this.setState({ [name]: value });
	}

	calculateItem() {

		this.setState( ( state ) => {
			return { itemMount: state.costUnit * state.itemQuantity };
		});
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
						/>
					</Col>

					<Col sm={ 6 }>
						<Form.Label>Cantidad del articulo</Form.Label>
						<Form.Control 
							type="number"  
							onChange={ this.handleChange }
							value={ this.state.itemQuantity }
							name="itemQuantity"
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