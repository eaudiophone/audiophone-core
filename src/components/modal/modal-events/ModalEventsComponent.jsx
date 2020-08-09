import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const ModalComponent = ({ showModal, idEvent, deleteModal }) => {

	const handleClose = ( confirm ) => deleteModal( confirm, idEvent );
 
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

ModalComponent.propTypes = {
  showModal: PropTypes.bool.isRequired,
  idEvent: PropTypes.number.isRequired,
  deleteModal: PropTypes.func.isRequired
};

export default ModalComponent; 