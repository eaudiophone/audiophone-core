import React, { Component } from 'react';
import { recordMeetings } from './RecordHardcode';
import CardComponent from './../../components/card/CardComponent';
import FormEventComponent from './../../components/form/FormEventComponent';
import { ButtonToolbar, ButtonGroup, Button, Row } from 'react-bootstrap';

class RecordPage extends Component {

	constructor( props ) {

		super( props );

		this.state = { 
			meeting: recordMeetings
		};
	}

	componentDidMount() {
		this.changeMode('meetings');
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
							onClick={ () => this.changeMode('meetings') }
						>
							<i className="mr-2 fas fa-calendar"></i>
							Eventos
						</Button>
						<Button 
							variant="primary" 
							size="sm"
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

	getMeetingRecords() {

		return (
			
    		<Row>
    			{ 	this.state.meeting.map( ( element ) => (
    					<CardComponent meeting={ element } color="#c7e5ec" key={ element.id } /> 
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
				{ this.getHeader() }
				<div id="meetings">
					{ this.getMeetingRecords() }
				</div>
				<div id="form">
					<FormEventComponent   
						callback={ () => this.changeMode('meetings') }
						idService={ 1 } 
					/>
				</div>
			</div>
		);
	}
}

export default RecordPage;