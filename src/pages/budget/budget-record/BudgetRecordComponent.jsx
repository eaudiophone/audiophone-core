import React from 'react';
import { Formik } from 'formik';
import FormBudgetComponent from '../../../components/form/budget-form/FormBudgetComponent';
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

const FormRecord = ( props ) => {

	const {
		handleChange,
		handleSubmit,
		handleReset,
		errors,
		values
	} = props;

	return (

		<Form onSubmit={ handleSubmit } noValidate>

			<Form.Row>
				
				<FormBudgetComponent.InputDate 
					name="date"
          title="Fecha del evento"
          value={ values.date }
          error={ errors.date }
          columnSize={ 12 }
          change={ handleChange }
				/>

				 <FormBudgetComponent.InputHour 
          title="Hora de inicio:"
          name="startingTime"
          value={ values.startingTime }
          error={ errors.startingTime }
          columnSize={ 6 }
          change={ handleChange }
        />

        <FormBudgetComponent.InputHour 
        	title="Hora de finalización"
        	name="finishTime"
        	value={ values.finishTime }
        	error={ errors.finishTime }
        	columnSize={ 6 }
        	change={ handleChange }
        />

        <FormBudgetComponent.InputNumber 
        	title="Costo de hora"
        	name="costHour"
        	value={ values.costHour }
        	error={ errors.costHour }
        	columnSize={ 12 }
        	change={ handleChange }
        />

			</Form.Row>

			<FormBudgetComponent.Buttons reset={ handleReset } />
			
		</Form>
	);
}

export default BudgetRecordComponent;