import React, { Component } from 'react';
import { CalendarComponent, ToastComponent, LoadingComponent } from '../../components/index';
import { EventService } from '../../services/EventService';
import { RedirectService } from '../../services/RedirectService';

export class EventsAdminPage extends Component {

	eventService = new EventService();
	eventsCalendar = [];
	message = '';
	action = '';
	idTerms = {};  // { idTermsRental: 8, idTemsRecord: 7 }

	constructor( props ) {
		super( props );

		this.state = {
			loading: true,
			redirect: false,
			showToast: false,
			showModal: false
		};

		this.editEvent = this.editEvent.bind( this );
	}

	componentDidMount() {

		Promise.all([ this.eventService.getTerms(), this.eventService.getAllEventsCalendar() ])
			.then( ([ terms, events ]) => {
				
				this.idTerms = terms;
				this.eventsCalendar = events;
				
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


	editEvent( close = false, eventForm = null ) {
		
		if ( eventForm === null ) {
			return this.setState({ showModal: close });
		}

		let { values } = eventForm;

		const { ok, message } = this.eventService.verifyRangeHours( 
			values.apiaudiophonevents_begintime, 
			values.apiaudiophonevents_finaltime 
		);

		if ( !ok && ( parseInt( values.id_apiaudiophoneservices ) === 2 ) ) {
			
			this.message = message;
			this.action = 'Error'; 

			return this.setState({ showToast: true, showModal: close });
		}

 		values = { 
			...values, 
			apiaudiophonevents_totalhours: this.eventService.getDifferenceHours( 
				values.apiaudiophonevents_begintime, 
				values.apiaudiophonevents_finaltime, 
			),
			id_apiaudiophoneterms: parseInt( values.id_apiaudiophoneservices ) > 1 ? 
				this.idTerms.idTermsRecord : this.idTerms.idTermsRental,
			id_apiaudiophoneservices: parseInt( values.id_apiaudiophoneservices ),
			apiaudiophonevents_address: values.id_apiaudiophoneservices > 1 ? 
				'Estudio Principal Av. Principal de Manicomio Esq. Trinchera La Pastora' : values.apiaudiophonevents_address
 		};

 		const updateStatus = {
 			apiaudiophonevents_id: values.apiaudiophonevents_id,
 			apiaudiophonevents_status: values.apiaudiophonevents_status
 		};

 		console.log( values, updateStatus );

		return this.sendData( values, updateStatus );
	}

	sendData( form, status, closeModal = false ) {
		
		this.setState({ showModal: closeModal, loading: true })

		Promise.all([ this.eventService.updateEvent( form ), this.eventService.updateStatusEvent( status ) ])
			.then(([ respUpdate, respStatus ]) => {

				this.message = respUpdate.message;
				this.action = respUpdate.action;

				// console.log( respStatus, respUpdate.eventUpdate );

				this.eventsCalendar = this.eventsCalendar.map(( event ) => {
					
					let { extendedProps } = event;

					if ( extendedProps.apiaudiophonevents_id === respStatus.eventUpdate.apiaudiophonevents_id ) {
						
						// console.log( event );

						return {
							...event,
							extendedProps: respStatus.eventUpdate
						};
					}

					return event;
				});

				// console.log( this.eventsCalendar );

				return this.setState({ showToast: true, loading: false });
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
				closeModal={ ( resp, event ) => this.editEvent( resp, event )  } 
				openModal={ this.state.showModal }
				showModal={ ( open ) => this.setState({ showModal: open }) }
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