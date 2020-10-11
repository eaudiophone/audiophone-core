import React from 'react';
import { Formik, Form as FormFormik, Field } from 'formik';
import { FormInputDate, HourInput, NumberInput, FormButtons } from '../../../components/form/FormComponent';
import { Form } from 'react-bootstrap';
import FormRecordSchema from '../../../components/form/budget-form/FormRecordSchema';
import RecordBudgetModels from '../../../models/RecordBudgetModels';

const BudgetRecordComponent = () => {

	const test = ( values, actions ) => {
		actions.setSubmitting( false );
		console.log( values );
	}

	return (
		
		<div className="m-2">
			<Formik 
				component={ FormRecord }
				validationSchema={ new FormRecordSchema().getSchema() }
				initialValues={ new RecordBudgetModels() }
				onSubmit={ test }
				validateOnChange={ false }
			/>
		</div>
	);
}

const FormRecord = ({ handleReset, isSubmitting, isValid }) => {

	return (

		<FormFormik className="mt-3" noValidate>

			<Form.Row>

				<Field 
					name="date"
					title="Fecha del evento"
					type="date"
					component={ FormInputDate }
				/>

				<Field 
					title="Hora de inicio"
					name="startingTime"
					type="time"
					columnSize={ 6 }
					component={ HourInput }
				/>
				

				<Field 
					title="Hora de finalización"
					name="finishTime"
					type="time"
					columnSize={ 6 }
					component={ HourInput }
				/>

				<Field 
					title="Costo de hora"
        	name="costHour"
        	type="number"
        	component={ NumberInput }
				/>	
			

			</Form.Row>

			<FormButtons reset={ handleReset } disabled={ !isValid } loading={ isSubmitting } />	
			
		</FormFormik>
	);
}

export default BudgetRecordComponent;