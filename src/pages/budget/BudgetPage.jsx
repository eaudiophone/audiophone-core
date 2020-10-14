import React, { Component } from 'react';
import { ModalNewBudgetComponent } from './../../components/modal/index';
import BudgetRentalComponent from './budget-rental/BudgetRentalComponent';
import BudgetRecordComponent from './budget-record/BudgetRecordComponent';
import { Button, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class BudgetPage extends Component {

	newItemButton = null;	
	totalButton =  null;

	constructor( props ) {

		super( props );

		this.state = { 
			showModal: false,
			items: JSON.parse( localStorage.getItem('items') ) || [],
		};

		this.showModalItem = this.showModalItem.bind( this );
		this.closeModalItem = this.closeModalItem.bind( this );
	}

	checkItems() {

		if ( this.state.items.length > 0 ) {

			return this.state.items.map( ( element, index ) => (
				<BudgetRentalComponent
					deleteItemPage={ ( newArray ) => this.deleteItemPage( newArray ) } 
					item={ element }  
					key={ index } 
				/>
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
			
		if ( data !== null ) {

			const arrayLocalStorage = JSON.parse( localStorage.getItem('items') ) || [];
			arrayLocalStorage.push( data );

			localStorage.setItem('items', JSON.stringify( arrayLocalStorage ));
			
			return this.setState({ 
				items: arrayLocalStorage,
				showModal: false
			});
		}

		this.setState({ 
			showModal: false,
		});
	}

	changeTab( number ) {

		if ( this.totalButton !== null ) {
			this.totalButton.hidden = number === 1 ? false : true;
		}

		this.newItemButton.hidden = number === 1 ? false : true;
	}

	getTotalBudget() {
		
		let sum = 0;
		let arrayLocalStorage = JSON.parse( localStorage.getItem('items') );

		arrayLocalStorage.forEach(( element ) => {
			sum += element.itemMount;
		});

		console.log( sum );
	}

	deleteItemPage( newArray ) {
		this.setState({ items: newArray });
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
					ref={ ( element ) => 	this.newItemButton = element }
				>
					<FontAwesomeIcon className="mr-2" icon="plus" />
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
				className="tab-pane show active"
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
				className="tab-pane"
				id="nav-record"
				aria-labelledby="record-tab"
			>
				<BudgetRecordComponent />
			</div>
		);
	}	

	render() {

		return (
			<div>

				<ModalNewBudgetComponent 
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
							ref={ ( element ) => this.totalButton = element }
						>Obtener total presupuesto</Button>
					</div>
				}

			</div>
		);
	}
}