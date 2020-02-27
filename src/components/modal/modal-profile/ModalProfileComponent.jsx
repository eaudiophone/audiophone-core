import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import FormProfileComponent from './../../form/profile-form/FormProfileComponent';
// import ProfileSchema from './../../../components/form/profile-form/ProfileSchema';
import { Formik } from 'formik';
import './ModalProfileComponent.css';

const EditProfileModal = ( props ) => {

	const user = props.user;

	const handleClose = ( values, actions ) => {
		
			if ( actions !== undefined ) {
				actions.setSubmitting( false );
			}

			props.editUser( values || null );
	};

	return (
		
		<Modal 
			show={ props.showModal } 
			onHide={ () => handleClose() }
			size="lg"
		>
			<Formik 
				initialValues={ user }
				component={ FormEdit }
				onSubmit={ handleClose }
				validateOnChange={ false }
			/>
		</Modal>
	);	
}

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
		
		<Form onSubmit={ handleSubmit }>
			<Modal.Header closeButton>
				<Modal.Title>Editar usuario:</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<FormProfileComponent.FormInput 
					data={{
						title: 'Nombre',
						name: 'name',
						value: values.name,
						error: errors.name,
						change: handleChange
					}}
				/>
				<FormProfileComponent.FormInput 
					data={{
						title: 'Correo',
						name: 'email',
						value: values.email,
						error: errors.email,
						change: handleChange
					}}
				/>
				<FormProfileComponent.FormInputDate 
					data={{
						title: "Fecha de registro:",
						name: "registrationDate",
						value: values.registrationDate,
						error: errors.registrationDate,
						change: handleChange
					}}
				/>	

				<Form.Row>
					<Form-Group>
						<Form.Label>Perfil de usuario</Form.Label>
						<div className="d-flex justify-content-around flex-row width">
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
				</Form.Row>

			</Modal.Body>

			<Modal.Footer>
	    	<Button 
	    		variant="secondary"
	    		type="reset" 
	    		onClick={ handleReset }
	    	>
	      	Close
	    	</Button>
	    	<Button 
	    		variant="primary" 
	    		type="submit"
	    		onClick={ handleSubmit }
	    	>
	      	Save Changes
	    	</Button>
	  	</Modal.Footer>
		</Form>
	);
};

const DeleteProfileModal = ( props ) => {

	const id = props.id;

	const handleClose = ( confirm ) => props.deleteUser( confirm, id );

	return (
		
		<Modal 
			show={ props.showModal } 
			onHide={ () => handleClose( false ) }
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
		    		onClick={ () => handleClose( false ) }
		    	>
		      	Cerrar
		    	</Button>
		    	<Button 
		    		variant="primary" 
		    		type="submit"
		    		onClick={ () => handleClose( true ) }
		    	>
		      	Confirmar
		    	</Button>
	  	</Modal.Footer>
		</Modal>
	);
}

export default { 
	EditProfileModal, 
	DeleteProfileModal 
};