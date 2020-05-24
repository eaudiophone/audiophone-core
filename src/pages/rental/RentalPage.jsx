import React, { Component } from 'react';
import { rentalMeetings } from './RentalHardcode';
import CardComponent from './../../components/card/CardComponent';
import { Row } from 'react-bootstrap';

class RentalPage extends Component {

	constructor( props ) {

		super( props );

		this.state = { 
			meetings: rentalMeetings, 
		};
	}

	setHeader() {

		return (

			<div className="d-flex justify-content-start flex-wrap flex-md-nowrap 
				align-items-center pb-2 mb-3 border-bottom">
				<h2>Alquiler de equipos</h2> 
			</div>
		);
	}


	setMeetingRental() {

		return (
			<Row>
				{ 	
					this.state.meetings.map( ( element ) => (
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
				{ this.setHeader() }
				{ this.setMeetingRental() }
			</div>
		);
	}
}

export default RentalPage;