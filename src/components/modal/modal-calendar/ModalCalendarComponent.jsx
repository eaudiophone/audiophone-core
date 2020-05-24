import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalCalendarComponent = ({ showModal, closeModal }) => (

	<Modal 
		show={ showModal }
	 	onHide={ () => closeModal() } 
	 	size="lg"
	 >
		<Modal.Header  closeButton>
			<Modal.Title>Evento de calendario</Modal.Title>
		</Modal.Header>
		<ModalContentEvent />
	</Modal>
);

const ModalContentEvent = () => (

	<Modal.Body>
		<p> Prueba de contenido </p>
	</Modal.Body>
);


export default ModalCalendarComponent;