import React, { Component } from 'react';
import { 
	ButtonToolbar, 
	ButtonGroup, 
	Button,
	Row
} from 'react-bootstrap';
import CardComponent from './../../components/card/CardComponent';
import { MEETINGS } from './../../hardcode/MeetigsHardcode';
import ModalEventComponent from '../../components/modal/modal-events/ModalEventsComponent';

class IndexEventPage extends Component {

	constructor( props ) {

		super( props );

		this.state = { 
			showModal: false, 
			idEvent: 0 
		}

		// crea referencias para nodos HTML
		this.rental = React.createRef();
		this.record = React.createRef();

		this.showModal = this.showModal.bind( this );
		this.deleteEvent = this.deleteEvent.bind( this );
	}

	componentDidMount() {
		this.changeView('record')
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
							<i className="mr-2 fas fa-microphone"></i>
							Grabación
						</Button>

						<Button 
							variant="success" 
							size="sm"
							onClick={ () => this.changeView('rental') }
						>
							<i className="mr-2 fas fa-truck"></i>
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

		if ( view === 'record' ) {

			this.record.current.style.display = 'block';
			this.rental.current.style.display = 'none';
	
		} else {

			this.record.current.style.display = 'none';
			this.rental.current.style.display = 'block';
		}
	}

	deleteEvent( confirm, id ) {

		return new Promise( ( resolve, reject ) => {

			if ( confirm ) {
				resolve({ confirm, id });
			} else {
				reject('no se realiza ninguna acción');
			}

			this.setState({ showModal: false });
		});
	}

	showModal( id ) {
		this.setState({ showModal: true, idEvent: id });
	}

	render() {
		return (
			
			<div>
				{ this.getHeader() }
				<div ref={ this.record }>
					{ this.showMeetings('record') }
				</div>
				<div ref={ this.rental }>
					{ this.showMeetings('rental') }
				</div>
				<ModalEventComponent 
					showModal={ this.state.showModal }
					idEvent={ this.state.idEvent }
					deleteModal={ ( confirm, id ) => this.deleteEvent( confirm, id ) }
				/>
			</div>
		);
	}
}

export default IndexEventPage;