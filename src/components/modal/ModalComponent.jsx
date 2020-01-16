import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalComponent = ( props ) => {

	const handleClose = () => props.callback(); 

	return (
		
    <Modal 
      show={ props.showModal } 
      onHide={ handleClose }
    >
      
    		<Modal.Header closeButton>
        	<Modal.Title>Nuevo evento</Modal.Title>
      	</Modal.Header>

      	<Modal.Body>Prueba</Modal.Body>

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