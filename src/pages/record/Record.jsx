import React, { Component } from 'react';
import { recordMeetings } from './RecordHardcode';

class Record extends Component {

	constructor( props ) {

		super( props );

		this.state = { meeting: recordMeetings };
	}

	getHeader() {
		
		return ( 

			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap 
				align-items-center pb-2 mb-3 border-bottom">
				
				<h2>Grabaciones</h2> 

				<div className="btn-toolbar mb-2 mb-md-0">
					<div className="btn-group">
						<button className="btn btn-sm btn-success">
							<i className="mr-2 fas fa-plus"></i>
							Nuevo evento
						</button>
						<button className="btn btn-sm btn-secondary">
							<i className="mr-2 fas fa-info-circle"></i>
							Información
						</button>
					</div>
				</div>
			</div>
		);
	}

	getMeetingRecords() {

		return (

    		<div className="row">

    			{ this.state.meeting.map( ( element ) => (

    					<div className="col-sm-6 mb-3" key={ element.id }>

    						<div className="card">
    							<div className="card-body">
    								{ this.getCardmeeting( element ) }
    							</div>
    						</div>
    					
    					</div>
    				)) 

    			}

    		</div>
		);
	}

	getCardmeeting( element ) {

		return (

			<div className="container-fluid">
			
				<div className="row d-flex justify-content-between">
					<i className="fas fa-microphone"></i>
					<h5 className="card-title">{ element.title }</h5>
					<i className="fas fa-times pointer"></i>
				</div>

				<div className="row d-flex justify-content-between">

					<label className="card-subtitle mb-2 text-muted text-left pt-2">
						Fecha del evento:
					</label>

					<label className="card-subtitle mb-2 text-muted text-left pt-2">
               			{ element.appointmentDate }
            		</label>
					
				</div>

				<div className="row d-flex justify-content-between pt-2">

					<h5>
                    	<span className="badge badge-secondary">
                      		<i className="mr-1 fas fa-clock"></i>
                      		Inicio: { element.startingTime }
                    	</span>
                    </h5>

                    <h5>
                    	<span className="badge badge-secondary">
                      		<i className="mr-1 fas fa-clock"></i>
                      		Cierre: { element.finalHour }
                    	</span>
                    </h5>

                   <div className="col-sm-12 pt-2 text-justify">
                    	<p>{ element.description }</p>       
                  </div>  
                </div>

                <div className="row d-flex justify-content-center pt-2">
                	<button className="btn btn-info">
                       	<i className="fas fa-edit"></i>
                    	Modificar
                    </button>  
                </div>

			</div>
		);
	}

	render() {

		return (
			
			<div>
				{ this.getHeader() }
				{ this.getMeetingRecords() }
			</div>
		);
	}
}

export default Record;