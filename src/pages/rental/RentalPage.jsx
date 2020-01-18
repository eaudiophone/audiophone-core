import React, { Component } from 'react';
import { rentalMeetings } from './RentalHardcode';
import FormEventComponent from './../../components/form/FormEventComponent';
import CardComponent from './../../components/card/CardComponent';
import { ButtonToolbar, ButtonGroup, Button, Row } from 'react-bootstrap';

class RentalPage extends Component {

	constructor( props ) {

		super( props );

		this.state = { 
			meetings: rentalMeetings, 
		};
	}

	componentDidMount() {
		this.changeMode('meetings');
	}

	setHeader() {

		return (

			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap 
				align-items-center pb-2 mb-3 border-bottom">
				
				<h2>Alquiler de equipos</h2> 

				<ButtonToolbar className="mb-2 mb-md-0">

					<ButtonGroup className="btn-group">
						<Button 
							variant="secondary" 
							size="sm"
							onClick={ () => this.changeMode('meetings') }
						>
							<i className="mr-2 fas fa-calendar"></i>
							Eventos
						</Button>
						<Button 
							size="sm" 
							variant="primary"
							onClick={ () => this.changeMode('form') }
						>
							<i className="mr-2 fas fa-plus"></i>
							Nuevo evento
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

	changeMode( mode ) {

		if ( mode === 'meetings' ) {
			document.getElementById('form').style.display = 'none';
			document.getElementById('meetings').style.display = 'block';

		} else {
			document.getElementById('form').style.display = 'block';
			document.getElementById('meetings').style.display = 'none';
		}
	}

	render() {

		return ( 
			<div>
				{ this.setHeader() }
				<div id="meetings">
					{ this.setMeetingRental() }
				</div>
				<div id="form">
					<FormEventComponent />
				</div>
			</div>
		);
	}
}

export default RentalPage;