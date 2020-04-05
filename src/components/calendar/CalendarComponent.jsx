import React, { Component } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es';  // spanish language
import interactionPlugin from "@fullcalendar/interaction";
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/core/main.css';

import { MEETINGS } from '../../hardcode/MeetigsHardcode';

class CalendarComponent extends Component {

	getArrayEvents() {
		
		return MEETINGS.map( ( element ) => {

			let event = {
				id: element.id,
				title: element.title,
				date: element.date,
				textColor: 'black'
			};

			if ( element.idService === 1 ) {

				event = {
					...event,
					color: '#fbf096'
				};

			} else {

				event = {
					...event,
					color: '#c7e5ec'
				};
			}

			return event;
		});
	}

	// javascript events fullcalendar
	handleClickDay( $event ) {
		console.log( $event );
	}

	handleClickEvent( $event ) {
		console.log( $event );
	}

	render() {

		return (

			<FullCalendar 
				defaultView="dayGridMonth" 
				plugins={[ dayGridPlugin, interactionPlugin ]} 
				events={ this.getArrayEvents() }
				locale={ esLocale }
				dateClick={ this.handleClickDay }
				eventClick={ this.handleClickEvent }
			/>
		);
	}
}

export default CalendarComponent;