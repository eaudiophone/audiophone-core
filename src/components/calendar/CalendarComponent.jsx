import React, { Component } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es';  // spanish language
import interactionPlugin from "@fullcalendar/interaction";
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/core/main.css';

import { ModalCalendarComponent } from './../modal/index';

import { MEETINGS } from '../../hardcode/MeetigsHardcode';

export class CalendarComponent extends Component {

	constructor( props ) {
		super( props );
		this.state = { showModal: false };

		this.handleClickDay = this.handleClickDay.bind( this );
		this.handleClickEvent = this.handleClickEvent.bind( this );
	}

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
		this.setState({ showModal: true });
	}

	handleClickEvent( $event ) {
		this.setState({ showModal: true });
	}

	render() {

		return (

			<div>
				<FullCalendar 
					defaultView="dayGridMonth" 
					plugins={[ dayGridPlugin, interactionPlugin ]} 
					events={ this.getArrayEvents() }
					locale={ esLocale }
					dateClick={ this.handleClickDay }
					eventClick={ this.handleClickEvent }
				/>
				<ModalCalendarComponent 
					showModal={ this.state.showModal }
					closeModal={ () => this.setState({ showModal: false }) }
				/>
			</div>

		);
	}
}
