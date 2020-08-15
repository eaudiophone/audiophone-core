import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

export const ChangeRoleModal = ({ user, editUser, showModal }) => (
	
	<Modal show={ showModal } onHide={ () => editUser() }>
		<Modal.Header closeButton>
			<Modal.Title>
				Modificar rol al usuario { user.apiaudiophoneusers_id }:
			</Modal.Title>
		</Modal.Header>

	<Modal.Body>
		<p className="text-left">
			¿Desea cambiar el rol a   
			<span className="mr-1 ml-1">
				{ user.apiaudiophoneusers_role === 'ADMIN_ROLE' ? 'usuario' : 'administrador' }?
			</span> 
		</p>
	</Modal.Body>

	<Modal.Footer>
  	<Button 
    		variant="secondary" 
    		onClick={ () => editUser() }
    	>
      	Cerrar
    	</Button>
    	<Button 
    		variant="primary" 
    		onClick={ () => editUser( user ) }
    	>
      	Confirmar
    	</Button>
	</Modal.Footer>

	</Modal>
);

ChangeRoleModal.propTypes = {
	user: PropTypes.object.isRequired,
	showModal: PropTypes.bool.isRequired,
	editUser: PropTypes.func.isRequired
};


export const DeleteProfileModal = ({ user, showModal, deleteUser }) => (
	
	<Modal 
		show={ showModal } 
		onHide={ () => deleteUser() }
	>
		
		<Modal.Header closeButton>
			<Modal.Title>Remover acceso al usuario { user.apiaudiophoneusers_id }:</Modal.Title>
		</Modal.Header>

		<Modal.Body>
			<p className="text-left">
				¿Desea cambiar el acceso a este usuario dentro de la aplicación?
			</p>
		</Modal.Body>

		<Modal.Footer>
    	<Button 
	    		variant="secondary" 
	    		onClick={ () => deleteUser() }
	    	>
	      	Cerrar
	    	</Button>
	    	<Button 
	    		variant="primary" 
	    		onClick={ () => deleteUser( user.apiaudiophoneusers_id ) }
	    	>
	      	Confirmar
	    	</Button>
  	</Modal.Footer>
	</Modal>		
);

DeleteProfileModal.propTypes = {
	user: PropTypes.object.isRequired,
	showModal: PropTypes.bool.isRequired,
	deleteUser: PropTypes.func.isRequired
}
