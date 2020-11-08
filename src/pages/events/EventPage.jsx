import React, { Component } from 'react';
import { 
	ButtonToolbar, 
	ButtonGroup, 
	Button,
	Row
} from 'react-bootstrap';
import { CardComponent, LoadingComponent } from './../../components/index';
import { MEETINGS } from './../../hardcode/MeetigsHardcode';
import { ModalEventComponent } from '../../components/modal/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EventService } from '../../services/EventService';

export class EventPage extends Component {

	// DOM elements
	rental = null;
	record = null;

	eventService = new EventService();

	constructor( props ) {

		super( props );

		this.state = { 
			showModal: false, 
			idEvent: 0,
			loading: false,
			events: [] 
		}

		this.showModal = this.showModal.bind( this );
		this.deleteEvent = this.deleteEvent.bind( this );
	}

	componentDidMount() {

		this.setState({ loading: true });

		this.eventService.getAllEvents()
			.then( events => {
				
				this.setState({ loading: false, events });
				
				return this.changeView('record');
			})
			.catch( error => {

				if ( error.status === 401 ) {
					return this.setState({ redirect: true });
				}

				this.message = error.message;
				this.action = error.action;

				return this.setState({ showToast: true, loading: false });
			})

	}

	getHeader() {

		return (

			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap 
				align-items-center pb-2 mb-3 border-bottom">
				<h2>Eventos</h2> 

				<ButtonToolbar className="mb-2 mb-md-0">
					<ButtonGroup>
						
						<Button 
							variant="success" 
							size="sm"
							onClick={ () => this.changeView('record') }
						>
							<FontAwesomeIcon className="mr-2" icon="microphone" />
							Grabación
						</Button>

						<Button 
							variant="success" 
							size="sm"
							onClick={ () => this.changeView('rental') }
						>
							<FontAwesomeIcon className="mr-2" icon="truck" />
							Alquiler
						</Button>

					</ButtonGroup>
				</ButtonToolbar>
			</div>
		);
	}

	showMeetings( mode ) {

		let events = [];
		let idService = 0;

		if ( mode === 'record' ) {

			idService = 1;
			events = MEETINGS.filter( ( element ) => element.idService === idService );

			return(

				<Row>
					{ 	
						events.map( ( element ) => (
							<CardComponent 
								meeting={ element } 
								color="#fbf096" key={ element.id }
								showModal={ ( id ) => this.showModal( id ) }
							/>
						)) 
				}
				</Row>
			);


		} else {

			idService = 2;
			events = MEETINGS.filter( ( element ) => element.idService === idService );

			return(

				<Row>
					{ 	
						events.map( ( element ) => (
							<CardComponent 
								meeting={ element } 
								color="#c7e5ec" key={ element.id }
								showModal={ ( id ) => this.showModal( id ) }
							/>
						)) 
				}
				</Row>
			);
		}

	}

	changeView( view ) {

		console.log( this.state.events );

		let events = [];

		if ( view === 'record' ) {
			
			events = this.state.events.map( event => {
				
				if ( event.id_apiaudiophoneservices === 2 ) {
					return event;
				}

				return null;

			}).filter( event => event );

			this.setState({ events });
			this.record.hidden = false;
			this.rental.hidden = true;

		} else {

			events = this.state.events.map( event => {
				
				if ( event.id_apiaudiophoneservices === 1 ) {
					return event;
				}

				return null;

			}).filter( event => event );

			this.setState({ events });
			this.record.hidden = true;
			this.rental.hidden = false;
		}

		console.log( events );
	}

	deleteEvent( confirm, id ) {

		if ( confirm ) {
			console.log( confirm, id );
		} 

		this.setState({ showModal: false });
	}

	showModal( id ) {
		this.setState({ showModal: true, idEvent: id });
	}


	showContent() {
		
		if ( !this.state.loading ) {
			return (
				<div>
					{ this.getHeader() }
					<div ref={ ( element ) => this.record = element }>
						{ this.showMeetings('record') }
					</div>
					<div ref={ ( element ) => this.rental = element }>
						{ this.showMeetings('rental') }
					</div>
				</div>
			);
		}

		return ( <LoadingComponent /> );
	}

	render() {
		return (
			
			<div>
				<ModalEventComponent 
					showModal={ this.state.showModal }
					idEvent={ this.state.idEvent }
					deleteModal={ ( confirm, id ) => this.deleteEvent( confirm, id ) }
				/>
				{ this.showContent() }
			</div>
		);
	}
}
