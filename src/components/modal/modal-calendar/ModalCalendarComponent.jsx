import React, { Fragment } from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import { Form as FormFormik, Formik, Field } from 'formik';
import { FormInput, FormInputDate, HourInput, SelectInput, TextAreaInput } from '../../form/FormComponent';

import { toCapitalize } from '../../../util-functions/string-format';

import { STATUS_MEETINGS } from '../../../hardcode/MeetigsHardcode';

export const ModalCalendarComponent = ({ showModal, closeModal, event = null }) => {

	// console.log( event );

	const handleSubmit = ( values, actions ) => {
		
		// console.log( values );
		
		return closeModal();
	}

	return (
		<Modal 
			show={ showModal }
		 	onHide={ () => closeModal() } 
		 	size="xl"
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

const ModalContentEvent = ( props ) => {

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
								title="Hora de inicio:"
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
		            title="Descripción del evento"
		            component={ TextAreaInput }
		            type="textarea"
		            readonly={ props.values.apiaudiophonevents_status !== 'POSPUESTO' }
		         />

						</Form.Row>
					</Container>

				</Modal.Body>


				<Modal.Footer>
					{ showButtons( props.values.apiaudiophonevents_status, !props.isValid ) }
				</Modal.Footer>
				
			</FormFormik>
		</Fragment>
	);
}

const showButtons = ( status, isValid ) => {
	
	if ( status === 'ACEPTADO' )  {
		
		return (
			<Button 
				variant="primary" 
				type="submit">Generar Presupuesto
			</Button>
		);
	}

	if ( status !== 'INGRESADO' ) {
		
		return (
			<Fragment>
				<Button variant="secondary" type="reset">
					Cancelar
				</Button>
				<Button 
					variant="primary" 
					type="submit"
					disabled={ isValid }
				>
					Editar
				</Button>
			</Fragment>
		);	
	} 

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
