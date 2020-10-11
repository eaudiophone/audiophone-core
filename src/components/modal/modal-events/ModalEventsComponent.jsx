import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

export const ModalEventComponent = ({ showModal, idEvent, deleteModal }) => {
 
	return (
		
    <Modal 
      show={ showModal } 
      onHide={ () => deleteModal( false ) }
    >
      
    		<Modal.Header closeButton>
        	<Modal.Title>Evento { idEvent }:</Modal.Title>
      	</Modal.Header>

      	<Modal.Body>¿Desea cancelar el evento?</Modal.Body>

      	<Modal.Footer>

        	<Button 
        		variant="secondary"
        		type="reset" 
        		onClick={ () => deleteModal( false ) }
        	>
          	Cancelar
        	</Button>
        	<Button 
        		variant="primary" 
        		type="submit"
        		onClick={ () => deleteModal( true, idEvent ) }
        	>
          	Confirmar
        	</Button>

      	</Modal.Footer>
  
    </Modal>
			
	);
};

ModalEventComponent.propTypes = {
  showModal: PropTypes.bool.isRequired,
  idEvent: PropTypes.number.isRequired,
  deleteModal: PropTypes.func.isRequired
};