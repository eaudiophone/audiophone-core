import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalComponent = ( props ) => {

	const handleClose = () => props.closeModal(); 
  
	return (
		
    <Modal 
      show={ props.showModal } 
      onHide={ handleClose }
    >
      
    		<Modal.Header closeButton>
        	<Modal.Title>Confirmar:</Modal.Title>
      	</Modal.Header>

      	<Modal.Body>¿Desea cancelar el evento?</Modal.Body>

      	<Modal.Footer>

        	<Button 
        		variant="secondary"
        		type="reset" 
        		onClick={ handleClose }
        	>
          	Close
        	</Button>
        	<Button 
        		variant="primary" 
        		type="submit"
        		onClick={ handleClose }
        	>
          	Save Changes
        	</Button>

      	</Modal.Footer>
  
    </Modal>
			
	);
};

export default ModalComponent; 