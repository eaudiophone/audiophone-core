import React, { Component } from 'react';
import { rentalMeetings } from './RentalHardcode';

import CardComponent from './../../components/card/Card';
import ModalComponent from './../../components/modal/Modal';

import { ButtonToolbar, ButtonGroup, Button, Row } from 'react-bootstrap';

class Rental extends Component {

	constructor( props ) {

		super( props );

		this.state = { 
			meetings: rentalMeetings, 
			showModal: false
		};

		this.handleModal = this.handleModal.bind( this );
	}

	handleModal() {

		if ( this.state.showModal ) {
			this.setState({ showModal: false });
		
		} else {
			this.setState({ showModal: true });

		} 
	}

	setHeader() {

		return (

			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap 
				align-items-center pb-2 mb-3 border-bottom">
				
				<h2>Alquiler de equipos</h2> 

				<ButtonToolbar className="mb-2 mb-md-0">

					<ButtonGroup className="btn-group">
						<Button 
							variant="success" 
							size="sm"
							onClick={ this.handleModal }
						>
							<i className="mr-2 fas fa-plus"></i>
							Nuevo evento
						</Button>
						<Button size="sm" variant="secondary">
							<i className="mr-2 fas fa-info-circle"></i>
							Información
						</Button>
					</ButtonGroup>

				</ButtonToolbar>
			</div>
		);
	}

	setMeetingRental() {

		return (
			<Row>
				{ 	this.state.meetings.map( ( element ) => (
						<CardComponent 
							meeting={ element } 
							color="#fbf096" 
							key={ element.id }
						/>
					)) 
				}
			</Row>
		);
	}

	render() {

		return ( 
			<div>
				<ModalComponent 
					showModal={ this.state.showModal } 
					callback={ this.handleModal }
					target="rental"
				/>
				{ this.setHeader() }
				{ this.setMeetingRental() }
			</div>
		);
	}
}

export default Rental;