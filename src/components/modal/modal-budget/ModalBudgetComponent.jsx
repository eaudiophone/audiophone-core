import React, { useState } from 'react';
import { useFormik } from 'Formik';
import { Modal, Button, Form } from 'react-bootstrap';
import FormBudgetComponent from  '../../form/budget-form/FormBudgetComponent';

const ModalBudgetComponent = ({ showModal }) => {

	const FormNewItem = () => {

		const formik =  useFormik({
			
			initialValues: {
				item: '',
				description: '',
				costUnit: 0,
				itemQuantity: 0,
				itemMount: 0
			},
			
			onSubmit: ( values, actions ) => {
		
				if ( values !==  undefined ) {
					actions.setSubmitting( false );
				}


			},

			onChange: ( $event ) => {
				console.log( event );
			}
		});

		console.log( formik );

		return (
			
			<Form onSubmit={ formik.handleSubmit } noValidate>
				
				<Modal.Header closeButton>
					<Modal.Title>Nuevo Articulo</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					
					<FormBudgetComponent.InputText 
						change={ formik.handleChange }
						name="item"
						error={ formik.errors.item }
						value={ formik.values.item }
						columnSize={ 12 }
						title="Nombre del articulo:"
					/>

					<FormBudgetComponent.InputTextArea 
						columnSize={ 12 }
						name="description"
						error={ formik.errors,item }
						value={ formik.values.description }
						title="Descripcion del articulo"
						change={ formik.handleChange }
					/>

					<FormBudgetComponent.InputNumber 
						columnSize={ 6 }
						name="costUnit"
						error={ formik.errors.costUnit }
						value={ formik.values.costUnit }
						title="Costo por unidad:"
						change={ formik.handleChange }
					/>

					<FormBudgetComponent.InputNumber 
						columnSize={ 6 }
						name="itemQuantity"
						error={ formik.errors.itemQuantity }
						value={ formik.values.itemQuantity }
						title="Cantidad del articulo:"
						change={ formik.handleChange }
					/>

					<FormBudgetComponent.InputNumber 
						columnSize={ 12 }
						name="itemMount"
						error={ formik.errors.itemMount }
						value={ formik.values.itemMount }
						title="Cantidad del articulo:"
						change={ formik.handleChange }
					/>

				</Modal.Body>

			</Form>
		);
	}

	return (
		
		<Modal show={ showModal }>
			<FormNewItem />
		</Modal>
	);
};



export default ModalBudgetComponent;