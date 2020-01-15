import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import FormEventsComponent from './../form/FormEventsComponent';

const ModalComponent = ( props ) => {

	const handleClose = () => props.callback(); 

	return (
		
    <Modal 
      show={ props.showModal } 
      onHide={ handleClose }
      size="lg"
    >
        		
      <Modal.Header closeButton>
        <Modal.Title>Nuevo evento</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FormEventsComponent 
          callback={ handleClose }
        />
      </Modal.Body>

      <Modal.Footer>

        <Button variant="secondary" onClick={ handleClose }>
          Close
        </Button>
        <Button variant="primary" onClick={ handleClose }>
          Save Changes
        </Button>

      </Modal.Footer>
      
    </Modal>
	);
};

export default ModalComponent; 