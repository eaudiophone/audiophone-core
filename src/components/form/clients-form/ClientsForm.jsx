import React from 'react';
import { Form, Formik, Field } from 'formik';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ClientsForm = ( props ) => {
	
	const { client, getClient } = props;

	return (
		<>
			<p>Client form works</p>
			{/*<Formik>
				{({ values, handleReset, isValid, isSubmitting }) => {
					return (
						<>
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
										
										{ !isSubmitting && (
						          <Button disabled={ !isValid } variant="primary" type="submit">
						            Enviar
						          </Button>
						          ) 
						        }
						        { isSubmitting && (
						          <Button disabled variant="primary">
						            <FontAwesomeIcon className="mr-2" icon="spinner" spin />
						            Enviar
						          </Button>
						          ) 
						        }

							  	</Modal.Footer>
								</Form>
						</>
					)
				}}
			</Formik>*/}
		</>
	); 
}