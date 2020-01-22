import React, { Component } from 'react';
import { 
	ButtonToolbar, 
	ButtonGroup, 
	Button,
	Row
} from 'react-bootstrap';
import CardComponent from './../../components/card/CardComponent';
import { MEETINGS } from './../../hardcode/MeetigsHardcode';

class IndexEventPage extends Component {

	componentDidMount() {
		
		this.changeView('record');
	}

	getHeader() {

		return (

			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap 
				align-items-center pb-2 mb-3 border-bottom">
				<h2>Eventos</h2> 

				<ButtonToolbar className="mb-2 mb-md-0">
					<ButtonGroup>
						
						<Button 
							variant="info" 
							size="sm"
							onClick={ () => this.changeView('record') }
						>
							<i className="mr-2 fas fa-microphone"></i>
							Grabación
						</Button>

						<Button 
							variant="info" 
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

		if ( mode === 'rental' ) {

			return(

				<Row>
					{ 	
						MEETINGS.rental.map( ( element ) => (
							<CardComponent meeting={ element } color="#fbf096" key={ element.id }/>
						)) 
				}
				</Row>
			);


		} else {

			return(

				<Row>
					{ 	
						MEETINGS.records.map( ( element ) => (
							<CardComponent meeting={ element } color="#c7e5ec" key={ element.id }/>
						)) 
				}
				</Row>
			);
		}

	}

	changeView( view ) {

		if ( view === 'record' ) {
			document.getElementById('record').style.display = 'block';
			document.getElementById('rental').style.display = 'none';
		
		} else {
			document.getElementById('rental').style.display = 'block';
			document.getElementById('record').style.display = 'none';

		}
	}

	render() {
		return (
			
			<div>
				{ this.getHeader() }
				<div id="record">
					{ this.showMeetings('record') }
				</div>
				<div id="rental">
					{ this.showMeetings('rental') }
				</div>
			</div>
		);
	}
}

export default IndexEventPage;