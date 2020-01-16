import React, { Component } from 'react';
import { recordMeetings } from './RecordHardcode';

import CardComponent from './../../components/card/CardComponent';
import FormEventComponent from './../../components/form/FormEventComponent';

import { ButtonToolbar, ButtonGroup, Button, Row } from 'react-bootstrap';

class RecordPage extends Component {

	constructor( props ) {

		super( props );

		this.state = { 
			meeting: recordMeetings,
			tab: false
		};

		console.log( this.state );
	}

	getHeader() {
		
		return ( 

			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap 
				align-items-center pb-2 mb-3 border-bottom">
				
				<h2>Grabaciones</h2> 

				<ButtonToolbar className="mb-2 mb-md-0">
					<ButtonGroup>
						
						<Button 
							variant="secondary" 
							size="sm"
						>
							<i className="mr-2 fas fa-calendar"></i>
							Eventos
						</Button>
						<Button 
							variant="success" 
							size="sm"
						>
							<i className="mr-2 fas fa-plus"></i>
							Nuevo evento
						</Button>


					</ButtonGroup>
				</ButtonToolbar>
			</div>
		);
	}

	getMeetingRecords() {

		return (
			
    		<Row>
    			{ 	this.state.meeting.map( ( element ) => (
    					<CardComponent 
    						meeting={ element } 
    						color="#c7e5ec" 
    						key={ element.id } 
    					/> 
    				)) 
    			}
    		</Row>
		);
	}

	changeMode( number ) {

		if ( number === 1 ) {

			return  this.getMeetingRecords();
		} 

		else {
			
			return ( <FormEventComponent /> );
		} 
	}

	render() {

		return (
			
			<div>
				{ this.getHeader() }
				{ this.changeMode( 1 ) }
			</div>
		);
	}
}

export default RecordPage;