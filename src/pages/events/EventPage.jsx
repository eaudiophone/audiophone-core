import React, { Component } from 'react';
import { 
	ButtonToolbar, 
	ButtonGroup, 
	Button,
	Row
} from 'react-bootstrap';
import { CardComponent, LoadingComponent, ToastComponent } from './../../components/index';
import { idServices } from './../../hardcode/MeetigsHardcode';
// import { ModalEventComponent } from '../../components/modal/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EventService } from '../../services/EventService';
import { RedirectService } from '../../services/RedirectService';

export class EventPage extends Component {

	eventService = new EventService();
	rentalRef = React.createRef();
	recordRef = React.createRef();
	message = '';
	action = '';

	constructor( props ) {

		super( props );

		this.state = { 
			// showModal: false, 
			idEvent: 0,
			loading: true,
			events: [],
			redirect: false,
			showToast: false 
		}

		this.showModal = this.showModal.bind( this );
		this.deleteEvent = this.deleteEvent.bind( this );
	}

	componentDidMount() {
		return this.changeView( idServices.RECORD );
	}

	changeView( idService = 1 ) {

		this.eventService.getAllEvents( true )
			.then( events => {

				// validacion de los tipos de eventos
				events = events.reduce(( accum, event ) => {
					
					if ( event.idService === idService ) {
						return accum = accum.concat([ event ]);
					}
			
					return accum;

				}, []);
				
				this.setState({ loading: false, events });				
			})
			.catch( error => {

				if ( error.status === 401 ) {
					return this.setState({ redirect: true });
				}

				this.message = error.message;
				this.action = error.action;

				return this.setState({ showToast: true, loading: false });
			})

		return this.switchTab( idService );
	}

	switchTab( idService ) {
		
		const nodeRental = this.rentalRef.current;
		const nodeRecord = this.recordRef.current;

		nodeRecord.hidden = idService > 1 ? false : true;
		nodeRental.hidden = idService > 1 ? true : false;
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

	getHeader() {

		return (

			<div className="d-flex justify-content-start flex-wrap flex-md-nowrap 
				align-items-center pb-2 mb-3 border-bottom">
				<h2>Eventos</h2> 
			</div>
		);
	}

	showMeetings( mode ) {

		if ( !this.state.loading ) {
			
			if ( mode === 'record' ) {

				return (
					<Row>
					{ 	
						this.state.events.length > 0 && this.state.events.map( ( element ) => (
							<CardComponent 
								meeting={ element } 
								color="#fbf096" 
								key={ element.id } 
								showModal={ ( id ) => this.showModal( id ) }
							/>
						)) 
					}
					{ 
						this.state.events.length === 0 && 
							(<p className="text-center text-danger w-100">No hay eventos de grabaciones registrados</p> )
					}
				</Row>
				);
			
			} else {
				
				return (
					<Row>
						{ 	
							this.state.events.length > 0 && this.state.events.map( ( element ) => (
								<CardComponent 
									meeting={ element } 
									color="#c7e5ec" 
									key={ element.id }
									showModal={ ( id ) => this.showModal( id ) }
								/>
							)) 
						}
						{
							this.state.events.length === 0 && 
								(<p className="text-center text-danger w-100">No hay eventos de alquiler registrados</p> )
						}
					</Row>
				);

			}
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
				<div>
					{ this.getHeader() }
					<Row className="justify-content-center mb-4">
						<ButtonToolbar className="mb-2 mb-md-0">
							<ButtonGroup>
								
								<Button 
									variant="success" 
									size="sm"
									onClick={ () => this.changeView( idServices.RECORD ) }
								>
									<FontAwesomeIcon className="mr-2" icon="microphone" />
									Grabación
								</Button>

								<Button 
									variant="success" 
									size="sm"
									onClick={ () => this.changeView( idServices.RENTAL ) }
								>
									<FontAwesomeIcon className="mr-2" icon="truck" />
									Alquiler
								</Button>

							</ButtonGroup>
						</ButtonToolbar>
					</Row>
					<div ref={ this.recordRef }>
						{ this.showMeetings('record') }
					</div>
					<div ref={ this.rentalRef }>
						{ this.showMeetings('rental') }
					</div>
				</div>
			</div>
		);
	}
}
