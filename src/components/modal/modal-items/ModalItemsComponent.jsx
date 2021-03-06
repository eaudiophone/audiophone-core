import React, { Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ItemsForm } from './../../form/items-form/ItemsForm';

export const ModalItemsComponent = ( props ) => {

	const { action, showModal, closeModal, item } = props;

	return (
		<Modal
			size={ action === 'delete' ? 'md' : 'lg' }
			show={ showModal }
			onHide={ () => closeModal() }
			centered={ action === 'delete' }
		>
			{ action === 'delete' && (
					<DeleteItem
						item={ item }
						confirm={ ( response ) => closeModal( 'delete', response ) }
					/>
				)
			}
			{
				action === 'edit' && (
					<EditItem
						item={ item }
						confirm={ ( response ) => closeModal( 'edit', response ) }
					/>
				)
			}
			{
				action === 'new' && (
					<NewItem
						confirm={ ( response ) => closeModal( 'new', response ) }
					/>
				)
			}
		</Modal>
	);
}

const NewItem = ( props ) => {

	const { confirm } = props;

	return (
		<Fragment>
			<Modal.Header closeButton>
				<Modal.Title>Nuevo articulo:</Modal.Title>
			</Modal.Header>
			<ItemsForm
				item={ null }
				getForm={ ( values, actions ) => confirm({ values, actions }) }
			/>
		</Fragment>
	);
};

const EditItem = ( props ) => {

	const { item, confirm } = props;

	return (
		<Fragment>
			<Modal.Header closeButton>
				<Modal.Title>Editar articulo { item.apiaudiophoneitems_id }:</Modal.Title>
			</Modal.Header>
			<ItemsForm
				item={ item }
				getForm={ ( values, actions ) => confirm({ values, actions }) }
			/>
		</Fragment>
	);
};

const DeleteItem = ( props ) => {

	const { item, confirm } = props;

	return (
		<Fragment>
			<Modal.Header closeButton>
				<Modal.Title>Remover articulo { item.apiaudiophoneitems_id }:</Modal.Title>
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
		    		onClick={ () => confirm({
		    				apiaudiophoneitems_id: item.apiaudiophoneitems_id,
		    				apiaudiophoneitems_status: item.apiaudiophoneitems_status === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO'
		    			})
		    		}
		    	>
		      	Confirmar
		    	</Button>
	  	</Modal.Footer>
		</Fragment>
	);
};
