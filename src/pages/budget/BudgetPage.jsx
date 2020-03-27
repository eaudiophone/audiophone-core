import React, { Component } from 'react';
import ModalBudgetComponent from './../../components/modal/modal-budget/ModalBudgetComponent';
import BudgetRentalComponent from './budget-rental/BudgetRentalComponent';
import { Button, Nav } from 'react-bootstrap';

class BudgetPage extends Component {

	constructor( props ) {

		super( props );

		this.state = { 
			showModal: false,
			items: [] 
		};

		// DOM References
		this.button = null;

		this.showModalItem = this.showModalItem.bind( this );
		this.closeModalItem = this.closeModalItem.bind( this );
	}

	setRef( element ) {
		this.button = element;
	}

	checkItems() {

		if ( this.state.items.length > 0 ) {

			return this.state.items.map( ( element, index ) => (
					<BudgetRentalComponent item={ element }  key={ index } />
				));

		} else {

			return ( 
				<p className="m-3 text-danger">
					No tienes articulos, Por favor selecciona un nuevo articulo para calcular un presupuesto.
				</p> 
			);
		}

	}

	showModalItem() {
		this.setState({ showModal: true });
	}

	closeModalItem( data ) {
		
		this.setState({ showModal: false });
		
		if ( data !== null ) {

			// crea una copia del array que es usado para mantener la inmutabilidad
			const items = this.state.items.slice();
			items.push( data );
			
			this.setState({ items: items });
		}

		console.log( this.state.items );
	}

	changeTab( number ) {
		this.button.hidden = number === 1 ? false : true;
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
					ref={ ( element ) => 	this.setRef( element ) }
				>
					<i className="mr-2 fas fa-plus"></i>
					Nuevo articulo
				</Button>
		
			</div>
		);
	}

	getTabs() {

		return (
			<Nav variant="tabs" defaultActiveKey="#nav-rental">
				<Nav.Item onClick={ () => this.changeTab( 1 ) }>
					<Nav.Link 
						className="nav-item nav-link" 
    				id="nav-rental-tab" 
    				data-toggle="tab" 
    				href="#nav-rental" 
    				role="tab" 
    				aria-controls="nav-rental" 
    				aria-selected="true"
    			>
    				Alquiler
    			</Nav.Link>
				</Nav.Item>
				
				<Nav.Item onClick={ () => this.changeTab( 2 ) }>
					<Nav.Link 
						className="nav-item nav-link" 
    				id="nav-record-tab" 
    				data-toggle="tab" 
    				href="#nav-record" 
    				role="tab" 
    				aria-controls="nav-record" 
    				aria-selected="true"
    			>
    				Grabación
    			</Nav.Link>
				</Nav.Item>
			</Nav>
		);
	}

	getTabRental() {

		return (
			<div 
				className="tab-pane fade show active"
				id="nav-rental"
				aria-labelledby="rental-tab"
			>
				{ this.checkItems() }
			</div>
		);
	}

	getTabRecord() {

		return (
			<div 
				className="tab-pane fade"
				id="nav-record"
				aria-labelledby="record-tab"
			>
				record-works
			</div>
		);
	}	

	getTotalBudget() {
		console.log('fino');
	}

	render() {

		return (
			<div>

				<ModalBudgetComponent 
					showModal={ this.state.showModal } 
					closeModal={ ( data ) => this.closeModalItem( data ) } 
				/>

				{ this.getHeader() }
				{ this.getTabs() }

				<div className="tab-content">
					{ this.getTabRental() }
					{ this.getTabRecord() }
				</div>

				{  this.state.items.length > 0 &&  
					
					<div className="d-flex flex-row justify-content-center">
						<Button 
							variant="success"
							onClick={ () => this.getTotalBudget() }
						>Obtener total presupuesto</Button>
					</div>
				}

			</div>
		);
	}
}

export default BudgetPage;