import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { CalendarComponent, ToastComponent } from '../../components/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EventService } from '../../services/EventService';
import { RedirectService } from '../../services/RedirectService';

export class EventsAdminPage extends Component {

	info = null;  // dom element
	eventService = new EventService();
	events = [];
	message = '';
	action = '';

	constructor( props ) {
		super( props );

		this.state = {
			loading: false,
			redirect: false,
			showToast: false,
		};
	}

	componentDidMount() {

		this.setState({ loading: true });

		this.eventService.getAllEventsCalendar()
			.then( resp => {
				this.events = resp;
				return this.setState({ loading: false });
			})
			.catch( error => {
				
				if ( error.status === 401 ) {
					return this.setState({ redirect: true });
				}

				this.message = error.message;
				this.action = error.action;
				return this.setState({ showToast: true, loading: false });	 
			});
	}

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
				{ this.state.redirect && ( <RedirectService route="/login" /> ) }
				<ToastComponent 
					showToast={ this.state.showToast }  
					content={ this.message } 
					context={ this.action } 
					onHide={ () => this.setState({ showToast: false }) }
				/>
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