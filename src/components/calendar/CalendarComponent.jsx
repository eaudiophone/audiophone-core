import React, { Component } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es';  // spanish language
import interactionPlugin from "@fullcalendar/interaction";
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/core/main.css';

import { ModalCalendarComponent } from './../modal/index';

export class CalendarComponent extends Component {

	calendarRef = React.createRef();
	calendarApi = null;  // calendarInstance 

	constructor( props ) {	
		super( props );

		this.handleClickDay = this.handleClickDay.bind( this );
		this.handleClickEvent = this.handleClickEvent.bind( this );
	}

	componentDidMount() {
		this.calendarApi = this.calendarRef.current.getApi();
	}

	handleClickDay( data ) {
		return this.props.showModal( true );
	}

	handleClickEvent( data ) {

		const resp = this.calendarApi.getEventById( 1 );

		console.log( resp );

		return this.props.showModal( true );
	}

	render() {

		return (

			<div>
				<FullCalendar 
					defaultView="dayGridMonth" 
					plugins={[ dayGridPlugin, interactionPlugin ]} 
					events={ this.props.events }
					locale={ esLocale }
					dateClick={ this.handleClickDay }
					eventClick={ this.handleClickEvent }
					ref={ this.calendarRef }
				/>
				<ModalCalendarComponent 
					showModal={ this.props.openModal }
					closeModal={ () => this.props.showModal( false ) }
				/>
			</div>

		);
	}
}
