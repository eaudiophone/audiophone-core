import  React, { Component } from 'react';
import { Formik } from 'formik';
import Event from '../../models/EventModels';
import EventSchema from '../../components/form/events-form/EventSchema';
import { getDifferenceHours, verifyRangeHours } from './../../util-functions/date-format';
import { ToastComponent, FormEventComponent } from './../../components/index';
import { EventService } from './../../services/EventService';
import { RedirectService } from '../../services/RedirectService';

export class EventPageForm extends Component {

	message = '';
	action = '';
	eventService = new EventService();
	idEvent = null;
	idTerms = {};  // { idTermsRental: 8, idTemsRecord: 7 }

	constructor( props ) {
		super( props );
		this.state = { 
			event: null, 
			showToast: false,
			redirect: false 
		};

		this.prepareValues = this.prepareValues.bind( this );
		this.sendData = this.sendData.bind( this );
	}

	componentDidMount() {

		const { params } = this.props.match;

		if ( Object.keys( params ).length > 0 ) { // edit
			
			this.idEvent = parseInt( params.id );

			// Promise all encadena un arreglo de promesas y devuelve el resultado

			Promise.all([ this.eventService.getTerms(), this.eventService.getEvent( this.idEvent ) ])
				.then( ([ terms, event ]) => {
					
					this.idTerms = terms;
					this.setState({ event });
					console.log( this.state.event );
				})
				.catch( error => {
						
					if ( error.status === 401 ) {
						return this.props.redirect();
					}

					this.message = error.message;
					this.action = error.action;
					this.setState({ showToast: true, showEditModal: false });	 
				});
			
		} else { // new

			this.eventService.getTerms()
				.then( resp => this.idTerms = resp )
				.catch( error => {

 					if ( error.status === 401 ) {
						return this.props.redirect();
					}

					this.message = error.message;
					this.action = error.action;
					this.setState({ showToast: true, showEditModal: false });	 				
	 			});
		}
	}

	prepareValues( values, actions ) {
		
		const { ok, message } = verifyRangeHours( values.apiaudiophonevents_begintime, values.apiaudiophonevents_finaltime );

		if ( !ok && ( parseInt( values.id_apiaudiophoneservices ) === 2 ) ) {
			
			this.message = message;
			this.action = 'Error'; 

			actions.setSubmitting( false );

			return this.setState({ showToast: true });
		}

 		values = { 
			...values, 
			apiaudiophonevents_totalhours: getDifferenceHours( 
				values.apiaudiophonevents_begintime, 
				values.apiaudiophonevents_finaltime, 
			),
			id_apiaudiophoneterms: parseInt( values.id_apiaudiophoneservices ) > 1 ? 
				this.idTerms.idTermsRecord : this.idTerms.idTermsRental,
			id_apiaudiophoneservices: parseInt( values.id_apiaudiophoneservices ),
			apiaudiophonevents_address: values.id_apiaudiophoneservices > 1 ? 
				'Estudio Principal Av. Principal de Manicomio Esq. Trinchera La Pastora' : values.apiaudiophonevents_address
 		};
		
 		setTimeout( () => this.sendData( values, actions ), 2000 );
 	}

 	sendData( values, actions ) {
 			
 		if ( !this.idEvent ) {  // crear
 			
 			this.eventService.registerEvent( values )
 				.then( resp => {
 					
 					actions.setSubmitting( false );
 					
 					this.message = resp.message;
 					this.action = resp.action;

 					return this.setState({
 						showToast: true
 					});
 				})
 				.catch( error => {

 					actions.setSubmitting( false );
 					
 					if ( error.status === 401 ) {
						return this.props.redirect();
					}

					this.message = error.message;
					this.action = error.action;
					this.setState({ showToast: true, showEditModal: false });
 				});

 		} else {  // actualizar
 			console.log('actualizar');
 		
 		}
 	}

	render() {

		return (

			<div>
				{ this.state.redirect && ( <RedirectService route="/login" /> ) }
				<ToastComponent 
					showToast={ this.state.showToast } 
					onHide={ () => this.setState({ showToast: false }) }  
					content={ this.message }
					context={ this.action }
				/>
				<div className="d-flex justify-content-start flex-wrap flex-md-nowrap 
					align-items-center pb-2 mb-3 border-bottom">
					{ !this.props.match.params.id && ( <h2>Nuevo evento</h2> ) }
					{ this.props.match.params.id && ( <h2>Actualizar evento</h2> ) }  
				</div>

				<Formik 
					component={ FormEventComponent }
					initialValues={  this.state.event  || new Event() }
					validationSchema={ new EventSchema().getSchema() }
					onSubmit={ this.prepareValues }
				/>
			</div>
		);
	}
}
