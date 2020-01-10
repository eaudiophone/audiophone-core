import React, { Component } from 'react';
import { rentalMeetings } from './RentalHardcode';

import Card from './../../components/card/Card';
import Modal from './../../components/modal/Modal';

import 'jquery/dist/jquery';
import 'bootstrap/dist/js/bootstrap';


class Rental extends Component {

	constructor( props ) {

		super( props );
		this.state = { meetings: rentalMeetings };
	}

	setHeader() {

		return (

			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap 
				align-items-center pb-2 mb-3 border-bottom">
				
				<h2>Alquiler de equipos</h2> 

				<div className="btn-toolbar mb-2 mb-md-0">
					<div className="btn-group">
						<button 
							className="btn btn-sm btn-success"
							data-toogle="modal"
							data-target="prueba" 
						>
							<i className="mr-2 fas fa-plus"></i>
							Nuevo evento
						</button>
						<button className="btn btn-sm btn-secondary">
							<i className="mr-2 fas fa-info-circle"></i>
							Información
						</button>
					</div>
				</div>
			</div>
		);
	}

	setMeetingRental() {

		return (
			<div className="row">
				{ this.state.meetings.map( ( element ) => (
					<Card meeting={ element } color="#fbf096" key={ element.id } />
					)) }
			</div>
		);
	}

	render() {
		return ( 
			<div>
				<Modal />
				{ this.setHeader() }
				{ this.setMeetingRental() }
			</div>
		);
	}
}

export default Rental;