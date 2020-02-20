import  React, { Component } from 'react';
import FormEventComponent from './../../components/form/events-form/FormEventComponent';
import { MEETINGS } from './../../hardcode/MeetigsHardcode';
import { Formik } from 'formik';
import EventSchema from './../../components/form/events-form/EventSchema';

class EditEventPage extends Component {

	getUrl() {
		return parseInt( this.props.match.params.id );
	}

	getEvent() {
		return MEETINGS.find( ( element ) => element.id === this.getUrl() );
	}

	getData( values, actions ) {
		console.log( values );
		actions.setSubmitting( false );
	}

	render() {

		return (

			<div>
				<div className="d-flex justify-content-start flex-wrap flex-md-nowrap 
					align-items-center pb-2 mb-3 border-bottom">
					<h2>Editar evento</h2> 
				</div>

				<Formik 
					component={ FormEventComponent }
					initialValues={ this.getEvent() }
					validationSchema={ new EventSchema().getSchema() }
					onSubmit={ this.getData }
					validateOnChange={ true }
				/>
			</div>
		);
	}
}

export default EditEventPage;