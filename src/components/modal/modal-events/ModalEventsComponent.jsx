import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalComponent = ( { showModal, idEvent, deleteModal } ) => {

	const handleClose = async ( confirm ) => {

    deleteModal( confirm, idEvent )
     .then( ( data ) => console.log( data ) )
     .catch( ( error ) => console.log( error ) ); 
  } 

	return (
		
    <Modal 
      show={ showModal } 
      onHide={ () => handleClose( false ) }
    >
      
    		<Modal.Header closeButton>
        	<Modal.Title>Evento { idEvent }:</Modal.Title>
      	</Modal.Header>

      	<Modal.Body>¿Desea cancelar el evento?</Modal.Body>

      	<Modal.Footer>

        	<Button 
        		variant="secondary"
        		type="reset" 
        		onClick={ () => handleClose( false ) }
        	>
          	Cancelar
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
};

export default ModalComponent; 