import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class BudgetPage extends Component {

	constructor( props ) {

		super( props );
		this.state = { showModal: false };
		this.addItem = this.addItem.bind( this );
	}

	addItem() {
		this.setState({ showModal: true });
	}

	getHeader() {

		return (
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap 
						align-items-center pb-2 mb-3 border-bottom">
				<h2>Presupuesto de servicios</h2>

				<Button 
					className="mb-2 mb-md-0"
					variant="primary" 
					size="sm"
					onClick={ () => this.addItem() }
				>
					<i className="mr-2 fas fa-plus"></i>
					Nuevo articulo
				</Button>
		
			</div>
		);
	}

	render() {

		return (
			<div>
				{ this.getHeader() }
			</div>
		);
	}
}

export default BudgetPage;