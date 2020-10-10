import  React, { Component } from 'react';
import FormEventComponent from './../../components/form/events-form/FormEventComponent';
import { MEETINGS } from './../../hardcode/MeetigsHardcode';
import { Formik } from 'formik';
import EventSchema from './../../components/form/events-form/EventSchema';

export class EditEventPage extends Component {

	getId() {
		return parseInt( this.props.match.params.id );
	}

	getEvent() {
		return MEETINGS.find( ( element ) => element.id === this.getId() );
	}

	getData( values, actions ) {
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
					<h2>Editar evento</h2> 
				</div>

				<Formik 
					component={ FormEventComponent }
					initialValues={ this.getEvent() }
					validationSchema={ new EventSchema().getSchema() }
					onSubmit={ this.getData }
					validateOnChange={ false }
				/>
			</div>
		);
	}
}