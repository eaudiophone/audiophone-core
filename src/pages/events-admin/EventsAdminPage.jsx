import React, { Component } from 'react';
import { CalendarComponent, ToastComponent, LoadingComponent } from '../../components/index';
import { EventService } from '../../services/EventService';
import { RedirectService } from '../../services/RedirectService';

export class EventsAdminPage extends Component {

	eventService = new EventService();
	eventsCalendar = [];
	message = '';
	action = '';

	constructor( props ) {
		super( props );

		this.state = {
			loading: true,
			redirect: false,
			showToast: false,
			showModal: false
		};
	}

	componentDidMount() {

		this.eventService.getAllEventsCalendar()
			.then( resp => {
				this.eventsCalendar = resp;
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

	showContent() {

		if ( !this.state.loading ) {
			return ( <CalendarComponent 
				events={ this.eventsCalendar } 
				showModal={ ( resp ) => this.setState({ showModal: resp })  } 
				openModal={ this.state.showModal }
			/> );
		}

		return ( <LoadingComponent /> );
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
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap 
					align-items-center pb-2 mb-3 border-bottom">
					<h2>Calendarios de eventos</h2> 
				</div>
				{ this.showContent() }
			</div>
		);
	}
}