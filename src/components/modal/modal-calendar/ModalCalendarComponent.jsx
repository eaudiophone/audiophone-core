import React, { Fragment } from 'react';
import { Modal, Button, Form, Container, Col } from 'react-bootstrap';
import { Form as FormFormik, Formik, Field } from 'formik';
import { FormInput, FormInputDate, HourInput, SelectInput, TextAreaInput } from '../../form/FormComponent';

export const ModalCalendarComponent = ({ showModal, closeModal, event = null }) => {

	console.log( event );

	const handleSubmit = ( values, actions ) => {
		console.log( values );
		return closeModal();
	}

	return (
		<Modal 
			show={ showModal }
		 	onHide={ () => closeModal() } 
		 	size="lg"
		 	centered
		 >
			<Modal.Header  closeButton>
				<Modal.Title>{ event ? event.apiaudiophonevents_title : 'Evento de Calendario' }</Modal.Title>
			</Modal.Header>
			<Formik 
				component={ ModalContentEvent }
				validateOnChange={ true }
				initialValues={ event }
				onSubmit={ handleSubmit }
			/>
		</Modal>
	)
};

const ModalContentEvent = ({ values, handleReset, isSubmitting, isValid  }) => (

	<Fragment>
		<FormFormik>

			<Modal.Body> 
				
				<Container>
					
					<Form.Row>

						<Col sm={ 12 }>
							{ /* Colocar botones */ }
						</Col>


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
							title="Hora de inicio:"
							component={ HourInput }
							columnSize={ 6 }
						/>

	          <Field 
	            name="apiaudiophonevents_address"
	            title="Direccion del evento:"
	            component={ TextAreaInput }
	            type="textarea"
	          />

	         <Field 
	            name="apiaudiophonevents_description"
	            title="Descripción del evento"
	            component={ TextAreaInput }
	            type="textarea"
	         />

					</Form.Row>
				</Container>



			</Modal.Body>

			<Modal.Footer>
				<Button variant="primary" type="submit">Confirmar</Button>
			</Modal.Footer>
			
		</FormFormik>
	</Fragment>
);

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
