import React, { Component, Fragment } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es';  // spanish language
import interactionPlugin from "@fullcalendar/interaction";
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/core/main.css';

import { compareDates } from '../../util-functions/date-format';

import { ModalCalendarComponent } from './../modal/index';
import './CalendarComponent.css';

export class CalendarComponent extends Component {

	/* documentación para mover dias en el calendario
		eventDrop={ this.handleMoveEvent }
		editable={ true } para mover eventos en el calendario
	*/

	calendarRef = React.createRef();
	calendarAPI = null;

	eventSelected = null;
	action = '';  // edit | new
	date = ''; // fecha (solo nuevo evento)

	constructor( props ) {
		super( props );

		this.state = { destroy: true }

		this.handleDayClick = this.handleDayClick.bind( this );
		this.handleEventClick = this.handleEventClick.bind( this );
	}

	componentDidMount() {
		this.calendarAPI = this.calendarRef.current.getApi();
	}

	handleEventClick({ event }) {

		const id = event._def.publicId;
		const result = this.calendarAPI.getEventById( id );

		this.eventSelected = result.extendedProps;
		this.action = 'edit';

		this.props.showModal( true );
	}

	handleDayClick( info ) {

		const result = compareDates( new Date( info.date ).setHours( 0, 0, 0, 0 ) );

		if ( !result ) {
			return;
		}

		this.eventSelected = null;
		this.action = 'new';
		this.date = result.date1;

		this.props.showModal( true );
	}

	renderModal() {

		if ( this.eventSelected || this.action === 'new' ) {
			return (
				<ModalCalendarComponent
					showModal={ this.props.openModal }
					closeModal={ ( resp, eventForm, action ) => this.props.closeModal( resp, eventForm, action ) }
					event={ this.eventSelected }
					action={ this.action }
					date={ this.date } // se inyecta la fecha del calendario solo en nuevo evento
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
					eventClick={ this.handleEventClick }
					ref={ this.calendarRef }
					dateClick={ this.handleDayClick }
				/>
				{ this.renderModal() }
			</Fragment>

		);
	}

}
