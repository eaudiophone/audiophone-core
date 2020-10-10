import  React, { Component } from 'react';
import { Formik } from 'formik';
import Event from '../../models/EventModels';
import EventSchema from '../../components/form/events-form/EventSchema';
import FormEventComponent from '../../components/form/events-form/FormEventComponent';
import { getDifferenceHours, verifyRangeHours } from './../../util-functions/date-format';
import { ToastComponent } from './../../components/toasts/ToastComponent';

class EventPageForm extends Component {

	message = '';
	action = '';

	constructor( props ) {
		super( props );
		this.state = { 
			event: null, 
			showToast: false 
		};

		this.sendData = this.sendData.bind( this );
	}

	componentDidMount() {
				
		const { id } = this.props.match.params;

		if ( id ) {
			return this.getEvent( Number( id ) );
		}
	}

	getEvent( id = 1 ) {
		// consultar al servicio cuando llega el id por parametro
		console.log( id );
	}

	sendData( values, actions ) {
	
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
				false 
			),
			id_apiaudiophoneservices: parseInt( values.id_apiaudiophoneservices ),
			apiaudiophonevents_address: values.id_apiaudiophoneservices > 1 ? 
				'Estudio Principal Av. Principal de Manicomio Esq. Trinchera La Pastora' : values.apiaudiophonevents_address
 		};
	
		console.log( values );
		actions.setSubmitting( false );

		// montar el servicio aqui
	}

	render() {

		return (

			<div>
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
					initialValues={  this.state.event || new Event() }
					validationSchema={ new EventSchema().getSchema() }
					onSubmit={ this.sendData }
				/>
			</div>
		);
	}
}

export default EventPageForm;