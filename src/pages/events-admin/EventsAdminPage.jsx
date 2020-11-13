import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { CalendarComponent } from '../../components/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class EventsAdminPage extends Component {

	info = null;  // dom element

	getHeader() {

		return (
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap 
			align-items-center pb-2 mb-3 border-bottom">
				<h2>Calendarios de eventos</h2> 
				<Button
					variant="info"
					onClick={ () => this.info.hidden = !this.info.hidden }
					size="sm"
				>
					<FontAwesomeIcon className="mr-2" icon="info-circle" />
					Mostrar info
				</Button>
			</div>
		);
	}

	render() {

		return (
			<div>
				{ this.getHeader() }
				<p 
					className="text-justify" 
					ref={ ( element ) => this.info = element }
					hidden={ true }
				>
					Este es el calendario de eventos del administrador puedes observar las
					solicitudes que realizan los clientes y acceptar, posponer o rechazar el evento.
				</p>
				<CalendarComponent />
			</div>
		);
	}
}