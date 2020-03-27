import React from 'react';
import { Formik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import FormBudgetComponent from  '../../form/budget-form/FormBudgetComponent';
import ItemModel from '../../../models/ItemModels';
import FormItemSchema from './../../form/budget-form/FormItemSchema';

const ModalBudgetComponent = ({ showModal, closeModal }) => (
	
	<Modal show={ showModal } onHide={ () => closeModal( null ) } size="lg">
		<Formik 
			component={ FormNewItem }
			initialValues={ new ItemModel() }
			validationSchema={ new FormItemSchema().getSchema() }
			
			onSubmit={ ( values, actions ) => {

				if ( actions !== undefined ) {
					actions.setSubmitting( false );
				}

				closeModal( values || null );

			} }
		/>
	</Modal>
);

const FormNewItem = ( props ) => {

	const {
		handleChange,
		handleSubmit,
		handleReset,
		values,
		errors
	} = props;

	return (
		
		<Form onSubmit={ handleSubmit } noValidate>
			
			<Modal.Header closeButton>
				<Modal.Title>Nuevo Articulo</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form.Row>

				<FormBudgetComponent.InputText 
					change={ handleChange }
					name="item"
					error={ errors.item }
					value={ values.item }
					columnSize={ 12 }
					title="Nombre del articulo:"
				/>

				<FormBudgetComponent.InputTextArea 
					columnSize={ 12 }
					name="description"
					error={ errors.description }
					value={ values.description }
					title="Descripcion del articulo"
					change={ handleChange }
				/>

				</Form.Row>

			</Modal.Body>

			<Modal.Footer>
	    	<Button 
	    		variant="secondary"
	    		type="reset" 
	    		onClick={ handleReset }
	    	>
	      	Cerrar
	    	</Button>
	    	<Button 
	    		variant="primary" 
	    		type="submit"
	    	>
	      	Actualizar
	    	</Button>
	  	</Modal.Footer>

		</Form>
	);
}

export default ModalBudgetComponent;