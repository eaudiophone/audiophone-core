import React, { Component } from 'react';
import { recordMeetings } from './RecordHardcode';

import CardComponent from './../../components/card/CardComponent';
import ModalComponent from './../../components/modal/ModalComponent';

import { ButtonToolbar, ButtonGroup, Button, Row } from 'react-bootstrap';

class Record extends Component {

	constructor( props ) {

		super( props );

		this.state = { 
			meeting: recordMeetings,
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

	getHeader() {
		
		return ( 

			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap 
				align-items-center pb-2 mb-3 border-bottom">
				
				<h2>Grabaciones</h2> 

				<ButtonToolbar className="mb-2 mb-md-0">
					<ButtonGroup>
						
						<Button 
							variant="success" 
							size="sm"
							onClick={ this.handleModal }
						>
							<i className="mr-2 fas fa-plus"></i>
							Nuevo evento
						</Button>

						<Button variant="secondary" size="sm">
							<i className="mr-2 fas fa-info-circle"></i>
							Información
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

	render() {

		return (
			
			<div>
				<ModalComponent 
					showModal={ this.state.showModal }
					callback={ this.handleModal }
					target="record"
				/>
				{ this.getHeader() }
				{ this.getMeetingRecords() }
			</div>
		);
	}
}

export default Record;