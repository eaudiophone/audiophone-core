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
	calendarInstance = null;
	eventSelected = null;

	constructor( props ) {	
		super( props );

		// this.handleMoveEvent = this.handleMoveEvent.bind( this );
		// this.handleDayClick = this.handleDayClick.bind( this );
		
		this.handleEventClick = this.handleEventClick.bind( this );
	}

	componentDidMount() {
		this.calendarInstance = this.calendarRef.current.getApi();
	}

	handleEventClick({ event }) {

		const id = event._def.publicId; 
		const result = this.calendarInstance.getEventById( id );

		this.eventSelected = result.extendedProps;

		return this.props.showModal( true );
	}

	/* 
		handleEventMove( info ) {  
		
			const resp = window.confirm('¿desea mover el evento a la fecha seleccionada?');

			if ( !resp ) {
				return info.revert(); // revert permite retroceder al movimiento anterior
			}

			console.log( info );
		}

		handleDayClick({ event }) {

			const id = event._def.publicId; 
			const result = this.calendarInstance.getEventById( id );

			this.eventSelected = result.extendedProps;

			return this.props.showModal( true );
		}
	*/

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
					eventClick={ this.handleEventClick }
					ref={ this.calendarRef }
					// dayClick={ this.handleDayClick }
					// eventDrop={ this.handleMoveEvent }
					// editable={ true } para mover eventos en el calendario
				/>
				{ this.renderModal() }
			</Fragment>

		);
	}

}
