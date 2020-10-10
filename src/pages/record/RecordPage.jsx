import React, { Component } from 'react';
// import { recordMeetings } from './RecordHardcode';
// import CardComponent from './../../components/card/CardComponent';
import { Row } from 'react-bootstrap';

export class RecordPage extends Component {

	getHeader() {
		
		return ( 

			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap 
				align-items-center pb-2 mb-3 border-bottom">
				<h2>Grabaciones</h2> 
			</div>
		);
	}

	getMeetingRecords() {

		return (
			
    		<Row>
    		
    		</Row>
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