import React, { Component } from 'react';
import ModalBudgetComponent from './../../components/modal/modal-budget/ModalBudgetComponent';
import { Button } from 'react-bootstrap';

class BudgetPage extends Component {

	constructor( props ) {

		super( props );
		this.state = { showModal: false };
		this.showModalItem = this.showModalItem.bind( this );
		this.closeModalItem = this.closeModalItem.bind( this );
	}

	showModalItem() {
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
					onClick={ () => this.showModalItem() }
				>
					<i className="mr-2 fas fa-plus"></i>
					Nuevo articulo
				</Button>
		
			</div>
		);
	}

	closeModalItem( data ) {
		
		this.setState({ showModal: false });
		
		if ( data !== null ) {
			console.log( data );
		}
	}

	render() {

		return (
			<div>
				<ModalBudgetComponent 
					showModal={ this.state.showModal } 
					closeModal={ ( data ) => this.closeModalItem( data ) } 
				/>
				{ this.getHeader() }
			</div>
		);
	}
}

export default BudgetPage;