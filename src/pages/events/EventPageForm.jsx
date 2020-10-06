import  React, { Component } from 'react';
import { Formik } from 'formik';
import Event from '../../models/EventModels';
import EventSchema from '../../components/form/events-form/EventSchema';
import FormEventComponent from '../../components/form/events-form/FormEventComponent';

class EventPageForm extends Component {

	constructor( props ) {
		super( props );
		this.state = { event: null };
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
		values = { 
			...values, 
			idService: Number( values.idService ), 
			totalHours: Number( values.totalHours )
		}; 
		console.log( values );
		actions.setSubmitting( false );
	}

	render() {

		return (

			<div>
				<div className="d-flex justify-content-start flex-wrap flex-md-nowrap 
					align-items-center pb-2 mb-3 border-bottom">
					<h2>Nuevo evento</h2> 
				</div>

				<Formik 
					component={ FormEventComponent }
					initialValues={  this.state.event || new Event() }
					validationSchema={ new EventSchema().getSchema() }
					onSubmit={ this.sendData }
					validateOnChange={ false }
				/>
			</div>
		);
	}
}

export default EventPageForm;