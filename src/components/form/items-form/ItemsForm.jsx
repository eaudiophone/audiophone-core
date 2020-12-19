import React, { Fragment } from 'react';
import { Form, Formik, Field } from 'formik';
import { ItemsSchema } from './ItemsSchema';
import Item from '../../../models/ItemModels';
import { Row, Col, Modal, Button } from 'react-bootstrap';

import { FormInput, TextAreaInput, DecimalNumberInput } from '../FormComponent';

export const ItemsForm = ( props ) => {
	
	const { item } = props;

	const handleSubmit = ( values, actions ) => {
		
		console.log( values );
		
		// return getItemForm( values );
	}

	return (
		<Fragment>
			<Formik
				initialValues={ item || new Item() }
				validationSchema={ new ItemsSchema().getSchema() }
				validateOnChange={ true }
				onSubmit={ handleSubmit }
			>
				{ ({ values, handleReset, isValid, isSubmitting }) => {
						
						return (
							<Fragment>
								<Form>
									<Modal.Body>
											<Row>
												<Col sm={ 12 }>
													<Field 
														name="apiaudiophoneitems_name"
														component={ FormInput }
														type="text"
														title="Nombre del articulo"
													/>
												</Col>

												<Field 
													name="apiaudiophoneitems_description"
													component={ TextAreaInput }
													type="textarea"
													title="Descripción del articulo"
												/>

												<Field 
													name="apiaudiophoneitems_price"
													component={ DecimalNumberInput }
													type="number"
													title="Precio unitario del articulo"
												/>
											</Row>
									</Modal.Body>

									<Modal.Footer>
							    	<Button variant="secondary" type="reset">
								      Cancelar
								    </Button>
								    	<Button 
								    		variant="primary" 
								    		type="submit"
								    		disabled={ !isValid }
								    	>
								      	Confirmar
								    	</Button>
							  	</Modal.Footer>
								</Form>

							</Fragment>
						);
					}
				}
			</Formik>

		</Fragment>
	);
}