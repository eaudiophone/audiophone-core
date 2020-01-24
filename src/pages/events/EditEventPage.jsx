import  React, { Component } from 'react';
import EditEventComponent from './../../components/form/EditEventComponent';
import { MEETINGS } from './../../hardcode/MeetigsHardcode';
import Event from './../../models/EventModels';

class EditEventPage extends Component {

	constructor( props ) {
		super( props );
		this.event = this.getEvent();
	}

	getUrl() {
		return parseInt( this.props.match.params.id );
	}

	getEvent() {
		
		const response = MEETINGS.find( ( element ) => element.id === this.getUrl() );

		return new Event(
			response.title,
			response.date,
			response.startingTime,
			response.finalHour,
			response.totalHours,
			response.description,
			response.addressMeeting,
			response.idService
		);		
	}

	render() {

		return (

			<div>
				<div className="d-flex justify-content-start flex-wrap flex-md-nowrap 
					align-items-center pb-2 mb-3 border-bottom">
					<h2>Editar evento</h2> 
				</div>

				<EditEventComponent event={ this.event }/>
			</div>
		);
	}
}

export default EditEventPage;