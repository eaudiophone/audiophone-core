import  React, { Component } from 'react';
import { Formik } from 'formik';
import Event from './../../models/EventModels';
import EventSchema from './../../components/form/EventSchema';
import FormEventComponent from './../../components/form/FormEventComponent';

class NewEventPage extends Component {

	getData( values, actions ) {
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
					initialValues={ new Event() }
					validationSchema={ new EventSchema().getSchema() }
					onSubmit={ this.getData }
					validateOnChange={ true }
				/>
			</div>
		);
	}
}

export default NewEventPage;