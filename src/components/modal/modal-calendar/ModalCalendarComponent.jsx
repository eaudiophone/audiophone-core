import React, { Fragment } from 'react';
import { Modal, Button, Form, Container, Col } from 'react-bootstrap';
import { Form as FormFormik, Formik, Field } from 'formik';
import { FormInput, FormInputDate, HourInput, SelectInput, TextAreaInput } from '../../form/FormComponent';
import EventSchema from '../../form/events-form/EventSchema';
import { toCapitalize } from '../../../util-functions/string-format';
import { STATUS_MEETINGS } from '../../../hardcode/MeetigsHardcode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Event from '../../../models/EventModels';


export const ModalCalendarComponent = ({ showModal, closeModal, event = null, action, date }) => {

	const handleSubmit = ( values, actions ) => {
		return closeModal( false, { values, actions }, action );
	}

	return (
		<Modal 
			show={ showModal }
		 	onHide={ () => closeModal( false, null ) } 
		 	size="xl"
		 	centered
		 >
			<Modal.Header  closeButton>
				<Modal.Title>{ event ? event.apiaudiophonevents_title : 'Nuevo evento' }</Modal.Title>
			</Modal.Header>
			<Formik 
				component={ action === 'edit' ? ModalEditEvent : ModalNewEvent }
				validateOnChange={ true }
				initialValues={ action === 'edit' ? event : new Event( '', '', date, '', '', '', '', '' ) }
				onSubmit={ handleSubmit }
				validationSchema={ new EventSchema().getSchema() }
			/>
		</Modal>
	)
};

const ModalEditEvent = ( props ) => {  // children

	// console.log( props );

	return (

		<Fragment>
			<FormFormik>

				<Modal.Body> 
					
					<Container>
						
						<label className="font-weight-bold">Estado del evento:</label>
						
						<Form.Row className="justify-content-around mb-4 mt-3">
							{ STATUS_MEETINGS.map(( status, index ) => (
									<Button 
										key={ index } 
										variant={ status === props.values.apiaudiophonevents_status ? 'primary' : 'secondary' }
										onClick={ () => props.setFieldValue( 'apiaudiophonevents_status', status ) }
									>
										{ toCapitalize( status ) }
									</Button>
								)) 
							}
						</Form.Row>

						<Form.Row>

							<Col sm={12} className="text-center">
								<p>
									<FontAwesomeIcon icon="clock" className="mr-2" />
									Tiempo total:
									<span className="ml-3 font-weight-bold">
										{ props.values.apiaudiophonevents_totalhours.hour }
									</span> Horas
									<span className="ml-3 font-weight-bold">
										{ props.values.apiaudiophonevents_totalhours.minutes }
									</span> Minutos
								</p>
							</Col>
						
							<Field 
								name="apiaudiophonevents_title" 
								type="text" 
								title="Nombre del evento:" 
								component={ FormInput }
								readonly={ props.values.apiaudiophonevents_status !== 'POSPUESTO' }
							/>

							 <Field 
	          		component={ SelectInput }
	          		title="Servicio a solicitar:"
	          		name="id_apiaudiophoneservices"
	          		options={ getOptions() }
	          		type="select"
	          		readonly={ props.values.apiaudiophonevents_status !== 'POSPUESTO' }
	        		/>

							<Field 
								name="apiaudiophonevents_date"
								type="date"
								title="Fecha del evento:"
								component={ FormInputDate }
								readonly={ props.values.apiaudiophonevents_status !== 'POSPUESTO' }
							/>

							<Field 
								name="apiaudiophonevents_begintime"
								type="time"
								title="Hora de inicio:"
								component={ HourInput }
								columnSize={ 6 }
								readonly={ props.values.apiaudiophonevents_status !== 'POSPUESTO' }
							/>

							<Field 
								name="apiaudiophonevents_finaltime"
								type="time"
								title="Hora de finalizacion:"
								component={ HourInput }
								columnSize={ 6 }
								readonly={ props.values.apiaudiophonevents_status !== 'POSPUESTO' }
							/>

		          <Field 
		            name="apiaudiophonevents_address"
		            title="Direccion del evento:"
		            component={ TextAreaInput }
		            type="textarea"
		            readonly={ props.values.apiaudiophonevents_status !== 'POSPUESTO' }
		          />

		         <Field 
		            name="apiaudiophonevents_description"
		            title="Descripción del evento:"
		            component={ TextAreaInput }
		            type="textarea"
		            readonly={ props.values.apiaudiophonevents_status !== 'POSPUESTO' }
		         />

						</Form.Row>
					</Container>

				</Modal.Body>


				<Modal.Footer> { /* Botones */ }

					{ props.values.apiaudiophonevents_status === 'ACEPTADO' && (
							
							<Button 
								variant="primary" 
								type="submit"
								disabled={ !props.isValid }
							>
								Generar Presupuesto
							</Button>
						) 
					}

					{ props.values.apiaudiophonevents_status !== 'INGRESADO' &&
						props.values.apiaudiophonevents_status !== 'ACEPTADO' && (

							<Fragment>
								<Button variant="secondary" type="reset">
									Cancelar
								</Button>
								<Button 
									variant="primary" 
									type="submit"
									disabled={ !props.isValid }
								>
									Editar
								</Button>
							</Fragment>
						) 
					}

				</Modal.Footer>
				
			</FormFormik>
		</Fragment>
	);
}


const ModalNewEvent = ( props ) => {  // children

	// console.log( props );

	return (

		<Fragment>
			<FormFormik>

				<Modal.Body> 
					
					<Container>

						<Form.Row>
						
							<Field 
								name="apiaudiophonevents_title" 
								type="text" 
								title="Nombre del evento:" 
								component={ FormInput }
							/>

							 <Field 
	          		component={ SelectInput }
	          		title="Servicio a solicitar:"
	          		name="id_apiaudiophoneservices"
	          		options={ getOptions() }
	          		type="select"
	        		/>

							<Field 
								name="apiaudiophonevents_date"
								type="date"
								title="Fecha del evento:"
								component={ FormInputDate }
							/>

							<Field 
								name="apiaudiophonevents_begintime"
								type="time"
								title="Hora de inicio:"
								component={ HourInput }
								columnSize={ 6 }
							/>

							<Field 
								name="apiaudiophonevents_finaltime"
								type="time"
								title="Hora de finalizacion:"
								component={ HourInput }
								columnSize={ 6 }
							/>


							{ props.values.id_apiaudiophoneservices === '1' && (
            
			            <Field 
			              name="apiaudiophonevents_address"
			              title="Direccion del evento:"
			              columnSize={ 12 }
			              component={ TextAreaInput }
			              type="textarea"
		          	  />
		          	)  
        			}

		         <Field 
		            name="apiaudiophonevents_description"
		            title="Descripción del evento"
		            component={ TextAreaInput }
		            type="textarea"
		         />

						</Form.Row>
					</Container>

				</Modal.Body>


				<Modal.Footer> { /* Botones */ }

					<Button variant="secondary" type="reset">
						Cancelar
					</Button>
					<Button 
						variant="primary" 
						type="submit"
						disabled={ !props.isValid }
					>
						Crear evento
					</Button>
					
				</Modal.Footer>
				
			</FormFormik>
		</Fragment>
	);
}




const getOptions = () => {

  let idServices = [];

  for ( let i = 1; i <= 2; i++ ) {

    if ( i === 1 ) {
      idServices = idServices.concat([{ value: i, description: 'servicio de alquiler ( Grupo Musical Horizonte )' }]);
    
    } else {
      idServices = idServices.concat([{ value: i, description: 'servicio de grabación ( Estudios Audiophone )' }]);
    }
  }

  return idServices;

};
