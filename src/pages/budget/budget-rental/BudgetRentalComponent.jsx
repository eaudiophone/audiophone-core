import React, { Component } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import ModalBudgetComponent from './../../../components/modal/modal-budget/ModalBudgetComponent';

class BudgetRentalContent extends Component {

	constructor( props ) {
		
		super( props );

		this.state = {
			id: props.id,
			item: props.item.item || '',
			description: props.item.description || '',
			costUnit: props.item.costUnit || 0,
			itemQuantity: props.item.itemQuantity || 0,
			itemMount: props.item.itemMount || 0,
			showModal: false
		};

		this.calculateItem = this.calculateItem.bind( this );
		this.handleChange = this.handleChange.bind( this );
	}

	componentDidMount() {

		// asignación de ID
		
		let arrayLocalStorage = JSON.parse( localStorage.getItem('items'));

		let find = arrayLocalStorage.find( element => element.item === this.state.item );
		find.id = this.state.id; 

		arrayLocalStorage[ arrayLocalStorage.indexOf( find ) ] = find;

		localStorage.setItem('items', JSON.stringify( arrayLocalStorage ))
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
			id: this.state.id,
			itemQuantity: this.state.itemQuantity,
			item: this.state.item,
			description: this.state.description,
			costUnit: this.state.costUnit,
			itemMount: this.state.costUnit * this.state.itemQuantity,
		};

		this.setLocalStorage( itemBudget );
	}

	setLocalStorage( itemBudget ) {

		let arrayLocalStorage = JSON.parse( localStorage.getItem('items') ) || [];

		if ( arrayLocalStorage.length > 0 ) {

			let found = arrayLocalStorage.find( ( element ) => element.id === itemBudget.id );

			console.log( found );

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

		if ( data !== null ) {

			let cloneItem = {
				...this.state,
				item: data.item,
				description: data.description
			};

			let arrayLocalStorage = JSON.parse( localStorage.getItem('items') );

			let elementFound = arrayLocalStorage.find( element => element.id === data.id );
			console.log( elementFound );

			arrayLocalStorage[ arrayLocalStorage.indexOf( elementFound ) ] = cloneItem;

			localStorage.setItem('items', JSON.stringify( arrayLocalStorage ));

			return this.setState({ 
				showModal: false, 
				item: data.item,
				description: data.description
			});
		}

		this.setState({ showModal: false });
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
							<h4>{ this.state.id }.- Nombre de articulo: { this.state.item }</h4>
							<Button 
								variant="dark" 
								size="sm"
								onClick={ () => this.showModal({  
									item: this.state.item,
									description: this.state.description
								}, this.state.id ) }
							>	
								<i className="fas fa-pen mr-2"></i>
								Editar
							</Button>
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