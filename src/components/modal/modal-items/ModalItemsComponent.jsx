import React, { Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ItemsForm } from './../../form/items-form/ItemsForm';

export const ModalItemsComponent = ( props ) => {
	
	const { action, showModal, closeModal, item } = props;

	return (
		<Modal size={ action === 'delete' ? 'md' : 'lg' } show={ showModal } onHide={ () => { closeModal() } }>
			{ action === 'delete' && ( 
					<DeleteItem 
						item={ item } 
						confirm={ ( response ) => props.closeModal( 'delete', response ) }  /> 
				) 
			}
			{
				action === 'edit' && (
					<EditItem 
						item={ item }
						confirm={ ( response ) => props.closeModal( 'edit', response ) } 
					/>
				)
			}
			{
				action === 'new' && (
					<NewItem 
						confirm={ ( response ) => props.closeModal( 'new', response ) } 
					/>
				)
			}
		</Modal>
	);
}

const NewItem = ( props ) => {

	return (
		<Fragment>
			<Modal.Header closeButton>
				<Modal.Title>Nuevo articulo:</Modal.Title>
			</Modal.Header>
			<ItemsForm item={ null } />
		</Fragment>
	);
};

const EditItem = ( props ) => {

	const { item, confirm } = props;

	return (
		<Fragment>
			<Modal.Header closeButton>
				<Modal.Title>Editar articulo { item.id }:</Modal.Title>
			</Modal.Header>

			<Modal.Body>
			</Modal.Body>

			<Modal.Footer>
	    	<Button 
		    		variant="secondary" 
		    		onClick={ () => confirm( false ) }
		    	>
		      	Cerrar
		    	</Button>
		    	<Button 
		    		variant="primary" 
		    		onClick={ () => confirm( item.id ) }
		    	>
		      	Confirmar
		    	</Button>
	  	</Modal.Footer>
		</Fragment>
	);
};

const DeleteItem = ( props ) => {
	
	const { item, confirm } = props;

	return (
		<Fragment>
			<Modal.Header closeButton>
				<Modal.Title>Remover articulo { item.id }:</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<p className="text-left">
					¿Desea cambiar la disponibilidad del articulo dentro del presupuesto?
				</p>
			</Modal.Body>

			<Modal.Footer>
	    	<Button 
		    		variant="secondary" 
		    		onClick={ () => confirm( false ) }
		    	>
		      	Cerrar
		    	</Button>
		    	<Button 
		    		variant="primary" 
		    		onClick={ () => confirm( item.id ) }
		    	>
		      	Confirmar
		    	</Button>
	  	</Modal.Footer>
		</Fragment>
	);
};
