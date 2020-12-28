import React, { Fragment } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

export const ModalSelectItemsComponent = ( props ) => {
	
	// props
	const { items, totalItems, showModal, closeModal, pagination } = props;

	let selectedItems = [];

	const handleChange = ( checked = true, item ) => {
	
		if ( checked ) {
			selectedItems = selectedItems.concat([ item ]);

		} else {
			selectedItems = selectedItems.filter(
				( selectedItem ) => item.apiaudiophoneitems_id !== selectedItem.apiaudiophoneitems_id );
		}

		console.log( selectedItems );
	}

	return (
		<Modal show={ showModal } size="xl" onHide={ closeModal }>
      <Modal.Header closeButton>
        <Modal.Title>Selecciona los artículos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TableSelectItems 
        	items={ items }
        	totalItems={ totalItems }
        	getItemSelected={ ( checked, item ) => handleChange( checked, item ) }
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ closeModal }>
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </Modal.Footer>
     </Modal>
	);
}

const TableSelectItems = ( props ) => {

	const { items, totalItems, pagination, getItemSelected } = props;
	
	const headerTable = ['Id', 'Nombre:', 'Descripción:', 'Precio:', 'Acciones:' ];
	
	return (
		<Fragment>
			<Table striped responsive hover>
				<thead className="thead-dark">
					<tr>
						{ headerTable.map(( column, index ) => (
								<th className="text-center" key={ index }>{ column }</th>
							)) 
						}
					</tr>
				</thead>
				<tbody>
					{ items.map(( item ) => (
							<tr key={ item.apiaudiophoneitems_id } className="text-center">
								<td>{ item.apiaudiophoneitems_id }</td>
								<td>{ item.apiaudiophoneitems_name }</td>
								<td>{ item.apiaudiophoneitems_description }</td>
								<td>{ item.apiaudiophoneitems_price }</td>
								<td>
									<input 
										type="checkbox" 
										onChange={ ( $event ) => getItemSelected( $event.target.checked, item ) } 
									/>
								</td>
							</tr>
						)) 
					}
				</tbody>		
			</Table>
		</Fragment>
	);
}