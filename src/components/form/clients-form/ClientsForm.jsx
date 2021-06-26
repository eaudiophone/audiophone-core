import React from 'react';
import { Form, Formik, Field } from 'formik';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Client from '../../../models/ClientModels';
import { FormInput, NumberInput } from '../FormComponent';
import ClientSchema from './ClientsSchema';

export const ClientsForm = ( props ) => {

	const { client, getForm } = props;

	console.log( client );

	return (
		<>
			<Formik
				initialValues={ client || new Client() }
				validateOnChange={ true }
				onSubmit={ getForm }
				validationSchema={ new ClientSchema()._schema }
			>
				{({ values, handleReset, isValid, isSubmitting }) => {
					return (
						<>
							<Form noValidate>
									<Modal.Body>
											<Row>
												<Col sm={ 12 }>
													<Field
														name="apiaudiophoneclients_name"
														component={ FormInput }
														type="text"
														title="Nombre del cliente"
													/>
												</Col>

												<Field
													name="apiaudiophoneclients_ident"
													component={ NumberInput }
													type="number"
													title="Número de identificación"
												/>

												<Col sm={ 12 }>
													<Field
														name="apiaudiophoneclients_phone"
														component={ FormInput }
														type="text"
														title="Numero telefónico"
													/>
												</Col>

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
			</Formik>
		</>
	);
}
