import React, { Fragment } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import { Form as FormFormik, Field, Formik } from 'formik';
import { BudgetSchema } from '../../form/budget-form/BudgetSchema';
import { FormInput } from '../../form/FormComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ModalBudgetComponent = ( props ) => {
	const { showModal, closeModal, budget, typeModal } = props;

	return (
		<Modal size={ typeModal === 'edit' ? 'xl' : 'md' } show={ showModal } onHide={ closeModal }>
			{ typeModal === 'edit' ?
				( <UpdateBudgetForm
						budget={ budget }
						confirm={ ( form ) => closeModal( form, 'edit' ) }
					/>
				) :
				( <DeleleBudgetConfirm
						budget={ budget }
						confirm={ ( resp, action ) => closeModal( resp, action ) }
					/> )
			}
		</Modal>
	);
}

const UpdateBudgetForm = ( props ) => {

	const { budget, confirm } = props;

	const handleSubmit = ( values, actions ) => confirm({ values, actions })

	return (
		<Fragment>
		 <Modal.Header closeButton>
       <Modal.Title>Editar datos del presupesto n° { budget.apiaudiophonebudgets_id }</Modal.Title>
     </Modal.Header>
     <Formik
	     	validationSchema={ new BudgetSchema().getSchema() }
	     	initialValues={ budget }
	     	validateOnChange={ true }
	     	onSubmit={ handleSubmit }
	     	component={ BudgetForm }
     />
    </Fragment>
	);
}

const DeleleBudgetConfirm = ( props ) => {

	const { budget, confirm } = props;

	return (
		<Fragment>
			<Modal.Header closeButton>
       <Modal.Title>
       		Remover registro de presupesto: { budget.apiaudiophonebudgets_id }
       </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      	¿Desea confirmar la eliminacion del presupesto?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ () => confirm() }>
          Limpiar
        </Button>
        <Button variant="primary" onClick={ () => confirm( budget, 'delete' ) }>
          Eliminar
        </Button>
      </Modal.Footer>
		</Fragment>
	);
}

const BudgetForm = ( props ) => {

	const { values, isSubmitting, isValid, setFieldValue } = props;

	console.log( values.apiaudiophonebudgets_status );

	return (
		<Fragment>
			<FormFormik>
				 <Modal.Body>

				 		<b>Estado del formulario:</b>
				 		<Form.Row className="justify-content-around mb-4 mt-3 row-buttons">
				 			<Button
				 				variant={ values.apiaudiophonebudgets_status === 'NO_APLICA' ? 'primary' : 'secondary' }
				 				onClick={ () => setFieldValue( 'apiaudiophonebudgets_status', 'NO_APLICA' ) }
				 			>
				 				No aplica
				 			</Button>
				 			<Button
				 				variant={ values.apiaudiophonebudgets_status === 'PENDIENTE' ? 'primary' : 'secondary' }
				 				onClick={ () => setFieldValue( 'apiaudiophonebudgets_status', 'PENDIENTE' ) }
				 			>
				 				Pendiente
				 			</Button>
				 			<Button
				 				variant={ values.apiaudiophonebudgets_status === 'PAGADO' ? 'primary' : 'secondary' }
				 				onClick={ () => setFieldValue( 'apiaudiophonebudgets_status', 'PAGADO' ) }
				 			>
				 				Pagado
				 			</Button>
				 		</Form.Row>

				 		<Form.Row className="mb-3 mt-2">
				 			<Col className="text-center" sm={ 6 }>
				 				Tipo de presupuesto: <b>{ values.apiaudiophonebudgets_nameservice }</b>
				 			</Col>
				 			<Col className="text-center" sm={ 6 }>
				 				Precio final: <b>{ values.apiaudiophonebudgets_total_price }$</b>
				 			</Col>
				 		</Form.Row>


	      		<Form.Row>
							<Col sm={ 12 }>
								<Field
									component={ FormInput }
									name="apiaudiophonebudgets_client_name"
									type="text"
									title="Nombre del cliente:"
								/>
							</Col>
							<Col sm={ 12 }>
								<Field
									component={ FormInput }
									name="apiaudiophonebudgets_client_email"
									type="text"
									title="Correo del cliente:"
								/>
							</Col>
							<Col sm={ 12 }>
								<Field
									component={ FormInput }
									name="apiaudiophonebudgets_client_phone"
									type="text"
									title="Teléfono del cliente:"
								/>
							</Col>
							<Col sm={ 12 }>
								<Field
									component={ FormInput }
									name="apiaudiophonebudgets_client_social"
									type="text"
									title="Red social del cliente:"
								/>
							</Col>

					</Form.Row>
	      </Modal.Body>
	      <Modal.Footer>
	        <Button variant="secondary" type="reset">
	          Limpiar
	        </Button>
	        { !isSubmitting && (
			        <Button variant="primary" disabled={ !isValid } type="submit">
			          Actualizar
			        </Button>
	        	)
	      	}
	      	{
	      		isSubmitting && (
	      			<Button variant="primary" disabled>
			           <FontAwesomeIcon className="mr-2" icon="spinner" spin />
			          Actualizar
			        </Button>
	      		)
	      	}
	      </Modal.Footer>
			</FormFormik>
		</Fragment>
	);
}
