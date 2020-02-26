import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EditProfileModal = ( props ) => {

	const user = props.user;

	const handleClose = ( user ) => props.editUser( user || null );

	return (
		
		<Modal 
			show={ props.showModal } 
			onHide={ () => handleClose() }
			size="lg"
		>
			
			<Modal.Header closeButton>
				<Modal.Title>Editar usuario:</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				Modal de edición
			</Modal.Body>

			<Modal.Footer>
	    	<Button 
	    		variant="secondary"
	    		type="reset" 
	    		onClick={ () => handleClose() }
	    	>
	      	Close
	    	</Button>
	    	<Button 
	    		variant="primary" 
	    		type="submit"
	    		onClick={ () => handleClose( user ) }
	    	>
	      	Save Changes
	    	</Button>
	  	</Modal.Footer>
		</Modal>
	);	
}

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
		      	Close
		    	</Button>
		    	<Button 
		    		variant="primary" 
		    		type="submit"
		    		onClick={ () => handleClose( true ) }
		    	>
		      	Save Changes
		    	</Button>
	  	</Modal.Footer>
		</Modal>
	);
}

export default { 
	EditProfileModal, 
	DeleteProfileModal 
};