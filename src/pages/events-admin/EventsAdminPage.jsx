import React, { Component } from 'react';
import { CalendarComponent, ToastComponent, LoadingComponent } from '../../components/index';
import { EventService } from '../../services/EventService';
import { RedirectService } from '../../services/RedirectService';

export class EventsAdminPage extends Component {

	eventService = new EventService();
	message = '';
	action = '';
	idTerms = {};  // { idTermsRental: 8, idTemsRecord: 7 }
	redirectRoute = '/login';

	constructor( props ) {
		super( props );

		this.state = {
			loading: true,
			redirect: false,
			showToast: false,
			showModal: false,
			eventsCalendar: [],
		};

		this.editEvent = this.editEvent.bind( this );
	}

	componentDidMount() {
		return this.getTermsAndEventsCalendar();
	}

	async getTermsAndEventsCalendar() {

		try {

			this.idTerms = await this.eventService.getTerms();
			
			return this.setState({ 
				loading: false, 
				eventsCalendar: await this.eventService.getAllEventsCalendar(),
			});

		} catch( error ) {

			if ( error.status === 401 ) {
				return this.setState({ redirect: true });
			}

			this.message = error.message;
			this.action = error.action;
			
			return this.setState({ showToast: true, loading: false });
		}
	}

	newEvent( close = false, eventForm = null ) {
		
		if ( !eventForm ) {
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

		this.sendData( values );
	}


	editEvent( close = false, eventForm = null ) {
		
		if ( !eventForm ) {
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

 		// console.log( values, updateStatus );

		this.sendData( values, updateStatus );
	}

	sendData( form, status = null ) {
		
		if ( form.apiaudiophonevents_id && status ) { // edit

			Promise.all([ this.eventService.updateEvent( form ), this.eventService.updateStatusEvent( status ) ])
				.then(([ respUpdate, respStatus ]) => {

					const eventUpdate = respStatus.eventUpdate;
			
					this.message = respUpdate.message;
					this.action = respUpdate.action;

					let events = this.state.eventsCalendar.reduce( this.reduceEvents.bind( eventUpdate ), []);

					console.log( events, eventUpdate );

					this.setState(() => ({ 
						eventsCalendar: events,
						showToast: true, 
						showModal: false,
					}));

					// si el evento es aceptado redirecciona a presupuesto
					if ( form.apiaudiophonevents_status === 'ACEPTADO' ) {
						return this.redirectNewBudget( form.apiaudiophonevents_id );
					}
				})
				.catch( error => {

					if ( error.status === 401 ) {
						return this.setState({ redirect: true });
					}

					this.message = error.message;
					this.action = error.action;
					
					return this.setState({ showToast: true });

				});
		
		} else {  // new event

			this.eventService.registerEvent( form )
				.then( resp => {

					this.message = resp.message;
					this.action = resp.action;

					const events = this.state.eventsCalendar.concat([ resp.event ]);

					return this.setState({ 
						loading: false, 
						showToast: true, 
						eventsCalendar: events, 
						showModal: false,
					});
				})
				.catch( error => {

					if ( error.status === 401 ) {
						return this.setState({ redirect: true });
					}

					this.message = error.message;
					this.action = error.action;
					
					return this.setState({ showToast: true, showModal: false, });
				})

		}
	}

	redirectNewBudget( idEvent ) {

		setTimeout(() => {					
			
			this.redirectRoute = `/budget/${ idEvent }`;	
			
			return this.setState({ redirect: true });	
		
		}, 1500 );
	}

	reduceEvents( accum, event ) {

		// this = eventUpdate

		const { apiaudiophonevents_id, apiaudiophonevents_status } = event.extendedProps;

		if ( apiaudiophonevents_status !== 'CERRADO' ) {

			if ( this.apiaudiophonevents_id === apiaudiophonevents_id  ) {
				return accum.concat([{
					...event,
					title: this.apiaudiophonevents_title,
					extendedProps: this
				}]);
			
			} else {
				return accum.concat([ event ]);
			
			}
		}

		// si hay un evento cerrado regresa el accum
		return accum;
	}

	prepareData( resp, event, action ) {
		
		if ( action === 'new' ) {
			return this.newEvent( resp, event );
		}

		return this.editEvent( resp, event );  
	}

	showContent() {

		if ( !this.state.loading ) {
			return ( 
				<CalendarComponent 
					events={ this.state.eventsCalendar } 
					closeModal={ ( resp, event, action = 'edit' ) => this.prepareData( resp, event, action ) } 
					openModal={ this.state.showModal }
					showModal={ ( open ) => this.setState({ showModal: open }) }
				/> 
			);
		}

		return ( <LoadingComponent /> );
	}

	render() {

		return (
			<div>
				{ this.state.redirect && ( <RedirectService route={ this.redirectRoute } /> ) }
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