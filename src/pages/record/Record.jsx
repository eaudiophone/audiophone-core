import React, { Component } from 'react';
import { recordMeetings } from './RecordHardcode';

import Card from './../../components/card/Card';

class Record extends Component {

	constructor( props ) {

		super( props );

		this.state = { meeting: recordMeetings };
	}

	getHeader() {
		
		return ( 

			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap 
				align-items-center pb-2 mb-3 border-bottom">
				
				<h2>Grabaciones</h2> 

				<div className="btn-toolbar mb-2 mb-md-0">
					<div className="btn-group">
						<button className="btn btn-sm btn-success">
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

	getMeetingRecords() {

		return (
			
    		<div className="row">
    			{ this.state.meeting.map( ( element ) => (
    				<Card meeting={ element } color="#c7e5ec" key={ element.id } /> )) 
    			}
    		</div>
		);
	}

	render() {

		return (
			
			<div>
				{ this.getHeader() }
				{ this.getMeetingRecords() }
			</div>
		);
	}
}

export default Record;