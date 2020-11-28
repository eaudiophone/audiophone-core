import React, { Component, Fragment } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es';  // spanish language
import interactionPlugin from "@fullcalendar/interaction";
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/core/main.css';

import { ModalCalendarComponent } from './../modal/index';

export class CalendarComponent extends Component {

	calendarRef = React.createRef();
	calendarInstance = null;  // calendarInstance 
	eventSelected = null;

	constructor( props ) {	
		super( props );

		this.handleClickDay = this.handleClickDay.bind( this );
		this.handleClickEvent = this.handleClickEvent.bind( this );
	}

	componentDidMount() {
		this.calendarInstance = this.calendarRef.current.getApi();
	}

	handleClickDay( data ) {
		return this.props.showModal( true );
	}

	handleClickEvent({ event }) {

		const id = event._def.publicId; 
		const result = this.calendarInstance.getEventById( id );

		this.eventSelected = result.extendedProps;

		return this.props.showModal( true );
	}

	renderModal() {

		if ( this.eventSelected ) {
			return (
				<ModalCalendarComponent 
					showModal={ this.props.openModal }
					closeModal={ ( resp, eventForm ) => this.props.closeModal( resp, eventForm ) }
					event={ this.eventSelected }
				/>
			);
		}
	}
	
	render() {

		return (

			<Fragment>
				<FullCalendar 
					defaultView="dayGridMonth" 
					plugins={[ dayGridPlugin, interactionPlugin ]} 
					events={ this.props.events }
					locale={ esLocale }
					dateClick={ this.handleClickDay }
					eventClick={ this.handleClickEvent }
					ref={ this.calendarRef }
				/>
				{ this.renderModal() }
			</Fragment>

		);
	}

}
