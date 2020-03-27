import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import FormProfileComponent from '../../form/profile-form/FormProfileComponent';
import ProfileSchema from './ModalProfileSchema';
import { Formik } from 'formik';

const EditProfileModal = ({ user, editUser, showModal }) => (
	
	<Modal 
		show={ showModal } 
		onHide={ () => editUser( null ) }
		size="lg"
	>
		<Formik 
			initialValues={ user }
			component={ FormEdit }
			validationSchema={ new ProfileSchema().getSchema() }
			validateOnChange={ false }

			onSubmit={ ( values, actions ) => {
					
				if ( actions !== null ) {
					actions.setSubmitting( false );
				}
	
				editUser( values || null );
			} }
		/>
	</Modal>
);

const FormEdit = ( props ) => {

	const {
		handleSubmit,
		handleReset,
		handleChange,
		values,
		errors
	} = props;

	let user = values.role === 'USER_ROLE' ? true : false;
	let admin = values.role === 'USER_ROLE' ? false: true;

	return (
		
		<Form onSubmit={ handleSubmit } noValidate>
			<Modal.Header closeButton>
				<Modal.Title>Editar usuario:</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<FormProfileComponent.FormInput 
					title='Nombre'
					name='name'
					value={ values.name }
					error={ errors.name }
					change={ handleChange }
				/>
				<FormProfileComponent.FormInput 
					title='Correo'
					name='email'
					value={ values.email }
					error={ errors.email }
					change={ handleChange }
				/>
				<FormProfileComponent.FormInputDate 
					title="Fecha de registro:"
					name="registrationDate"
					value={ values.registrationDate }
					error={ errors.registrationDate }
					change={ handleChange }
				/>	
	
				<Form-Group>
					<Form.Label>Perfil de usuario</Form.Label>
					<div className="d-flex justify-content-around flex-row">
						<Form.Check 
							type="radio"
							value="USER_ROLE"
							name="role"
							id="user"
							label="Usuario"
							onChange={ handleChange }
							checked={ user }
						/>
						<Form.Check 
							type="radio"
							value="ADMIN_ROLE"
							name="role"
							id="admin"
							label="Administrador"
							onChange={ handleChange }
							checked={ admin }
						/>
					</div>	
				</Form-Group>
			
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
};

const DeleteProfileModal = ({ id, showModal, deleteUser }) => (
	
	<Modal 
		show={ showModal } 
		onHide={ () => deleteUser( false ) }
	>
		
		<Modal.Header closeButton>
			<Modal.Title>Eliminar usuario { id }:</Modal.Title>
		</Modal.Header>

		<Modal.Body>
			¿Desea remover el acceso a este usuario?
		</Modal.Body>

		<Modal.Footer>
    	<Button 
	    		variant="secondary"
	    		type="reset" 
	    		onClick={ () => deleteUser( false ) }
	    	>
	      	Cerrar
	    	</Button>
	    	<Button 
	    		variant="primary" 
	    		type="submit"
	    		onClick={ () => deleteUser( true, id ) }
	    	>
	      	Confirmar
	    	</Button>
  	</Modal.Footer>
	</Modal>		
);


export default { 
	EditProfileModal, 
	DeleteProfileModal 
};