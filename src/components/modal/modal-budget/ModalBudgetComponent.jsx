import React from 'react';
import { Formik, Form as FormFormik, Field } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import { FormInput, TextAreaInput } from '../../form/FormComponent';
import ItemModel from '../../../models/ItemModels';
import FormItemSchema from './../../form/budget-form/FormItemSchema';

const FormItem = ( props ) => {

	const {
		handleReset,
		isValid
	} = props;

	return (
		
		<FormFormik noValidate>

			<Modal.Body>
				<Form.Row>

					<Field 
						title="Nombre del articulo:"
						name="item"
						type="text"
						component={ FormInput }
					/>

					<Field 
						name="description"
						title="Descripcion del articulo"
						component={ TextAreaInput }
					/>

				</Form.Row>

			</Modal.Body>

			<Modal.Footer>
	    	<Button 
	    		variant="secondary"
	    		type="reset" 
	    		onClick={ handleReset }
	    	>
	      	Limpiar
	    	</Button>
	    	<Button 
	    		variant="primary" 
	    		type="submit"
	    		disabled={ !isValid }
	    	>
	      	Actualizar
	    	</Button>
	  	</Modal.Footer>

		</FormFormik>
	);
};

export const ModalNewBudgetComponent = ({ showModal, closeModal }) => (
	
	<Modal show={ showModal } onHide={ () => closeModal( null ) } size="lg">
		<Modal.Header closeButton>
			<Modal.Title>Nuevo Articulo</Modal.Title>
		</Modal.Header>
		<Formik 
			component={ FormItem }
			initialValues={ new ItemModel() }
			validationSchema={ new FormItemSchema().getSchema() }
			validateOnChange={ false }
			
			onSubmit={ ( values, actions ) => {

				if ( actions !== undefined ) {
					actions.setSubmitting( false );
				}
				
				closeModal( values || null );

			}}
		/>
	</Modal>
);

export const ModalEditBudgetComponent = ({ showModal, closeModal, item }) => (

	<Modal show={ showModal } onHide={ () => closeModal( null ) } size="lg"> 
		<Modal.Header closeButton>
			<Modal.Title>Editar Articulo</Modal.Title>
		</Modal.Header>
		<Formik 
			component={ FormItem }
			initialValues={ item }
			validationSchema={ new FormItemSchema().getSchema() }
			validateOnChange={ false }
			onSubmit={ ( values, actions ) => {

				if ( actions !== undefined ) {
					actions.setSubmitting( false );
				}

				closeModal( values || null );

			}}
		/>
	</Modal>	
);
