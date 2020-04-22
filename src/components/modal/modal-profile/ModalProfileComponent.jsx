import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ChangeRoleModal = ({ user, editUser, showModal }) => (
	
	<Modal show={ showModal } onHide={ () => editUser( null, null ) }>
		<Modal.Header closeButton>
			<Modal.Title>Modicar acceso al usuario { user.id }:</Modal.Title>
		</Modal.Header>

	<Modal.Body>
		<p className="text-left">
			¿Desea cambiar el rol  "{ user.role }" a este usuario 
			dentro de la aplicación?
		</p>
	</Modal.Body>

	<Modal.Footer>
  	<Button 
    		variant="secondary" 
    		onClick={ () => editUser( false, null ) }
    	>
      	Cerrar
    	</Button>
    	<Button 
    		variant="primary" 
    		onClick={ () => editUser( true, user ) }
    	>
      	Confirmar
    	</Button>
	</Modal.Footer>

	</Modal>
);


const DeleteProfileModal = ({ id, showModal, deleteUser }) => (
	
	<Modal 
		show={ showModal } 
		onHide={ () => deleteUser( false ) }
	>
		
		<Modal.Header closeButton>
			<Modal.Title>Eliminar usuario { id }:</Modal.Title>
		</Modal.Header>

		<Modal.Body>
			<p className="text-left">
				¿Desea remover el acceso a este usuario dentro de la aplicación?
			</p>
		</Modal.Body>

		<Modal.Footer>
    	<Button 
	    		variant="secondary" 
	    		onClick={ () => deleteUser( false ) }
	    	>
	      	Cerrar
	    	</Button>
	    	<Button 
	    		variant="primary" 
	    		onClick={ () => deleteUser( true, id ) }
	    	>
	      	Confirmar
	    	</Button>
  	</Modal.Footer>
	</Modal>		
);


export default { 
	ChangeRoleModal, 
	DeleteProfileModal 
};