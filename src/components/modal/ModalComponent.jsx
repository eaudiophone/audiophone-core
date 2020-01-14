import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalComponent = ( props ) => {

	const handleClose = () => props.callback(); 

	return (
		
    <Modal show={ props.showModal } onHide={ handleClose }>
        		
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>

      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>

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