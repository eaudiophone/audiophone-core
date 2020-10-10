import React, { Component } from 'react';
// import CardComponent from './../../components/card/CardComponent';
import { Row } from 'react-bootstrap';

export class RentalPage extends Component {

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
