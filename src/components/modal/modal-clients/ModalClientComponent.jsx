import React from 'react'; 
import { Modal, Button } from 'react-bootstrap';
import { ClientsForm } from '../../form/clients-form/ClientsForm';

export const ModalClientComponent = ( props ) => {
	
	const { action, showModal, closeModal, client } = props;

	return (
		<Modal size="lg" show={ showModal } onHide={ () => closeModal() }>
			{
				action === 'new' && (
					<NewClient confirm={ ( response ) => { 
						console.log( response );
						closeModal( 'new', response ) 
					}} />
				)
			}
			{
				action === 'edit' && (
					<EditClient client={ client } confirm={ ( response ) => closeModal('edit', response ) } />
				)
			}
		</Modal>
	);
} 

const NewClient = ( props ) => {

	const { confirm } = props;

	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>Nuevo cliente:</Modal.Title>
			</Modal.Header>
			<ClientsForm
				client={ null }
				getForm={ ( values, actions ) => confirm({ values, actions }) }
			/>
		</>
	);
};

const EditClient = ( props ) => {

	const { client, confirm } = props;

	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>Editar cliente { 1 }:</Modal.Title>
			</Modal.Header>
			<ClientsForm
				client={ client }
				getForm={ ( values, actions ) => confirm({ values, actions }) }
			/>
		</>
	);
};

