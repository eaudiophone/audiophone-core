import React, { Fragment, useState } from 'react';
import { Modal, Button, Table, Row } from 'react-bootstrap';
import { PaginationComponent } from '../../index';

export const ModalSelectItemsComponent = ( props ) => {
	
	// props
	const { items, totalItems, showModal, closeModal, pagination } = props;
	
	// hooks
	const [ itemsSelected, setItemSelected ] = useState([]);

	// funcion que maneja la seleccion del articulo
	const handleChange = ( checked = true, item ) => {
		
		// console.log( 'function' );

		if ( checked && !itemsSelected.includes( item ) ) {
			setItemSelected( itemsSelected.concat([ item ]) );
			
		} else if ( !checked && itemsSelected.includes( item ) ) {
			setItemSelected(
				itemsSelected.filter(
				( selectedItem ) => item.apiaudiophoneitems_id !== selectedItem.apiaudiophoneitems_id )
			);

		} else {
			return;

		}
	}

	return (
		<Modal show={ showModal } size="xl" onHide={ () => { 
				
				// se resetea el valor de los articulos seleccionados 
        // cuando se sale del modal
				
				closeModal();
				setItemSelected([]);
			} 
		}>
      <Modal.Header closeButton>
        <Modal.Title>Selecciona los artículos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TableSelectItems 
        	items={ items }
        	totalItems={ totalItems }
        	getItemSelected={ ( checked, item ) => handleChange( checked, item ) }
        	pagination={ ( params ) => pagination( params )  }
        	itemsSelected={ itemsSelected }
        />
      </Modal.Body>
      <Modal.Footer>
        <Button 
        	variant="primary" 
        	disabled={ itemsSelected.length === 0 } 
        	onClick={ () => {
        			closeModal( itemsSelected );
        			setItemSelected([])
        		} 
        	}
        >
          Aceptar
        </Button>
      </Modal.Footer>
     </Modal>
	);
}

const TableSelectItems = ( props ) => {

	const { items, totalItems, pagination, getItemSelected, itemsSelected } = props;
	
	const headerTable = ['Id', 'Nombre:', 'Descripción:', 'Precio:', 'Acciones:'];

	// console.log( itemsSelected, items );

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
					{ items.length > 0 && items.map(( item ) => {

						// console.log( itemsSelected.includes( item ) );

						return (
							<tr key={ item.apiaudiophoneitems_id } className="text-center">
								<td>{ item.apiaudiophoneitems_id }</td>
								<td>{ item.apiaudiophoneitems_name }</td>
								<td>{ item.apiaudiophoneitems_description }</td>
								<td>{ item.apiaudiophoneitems_price }</td>
								<td>
									<input 
										type="checkbox" 
										onChange={ ( $event ) => getItemSelected( $event.target.checked, item ) } 
										checked={ itemsSelected.includes( item ) }
									/>
								</td>
							</tr>
							)
						}) 
					}
					{	items.length === 0 && (
							<tr>
								<td colSpan="5" className="text-center">
									No existen articulos disponibles
								</td>
							</tr>
						)
					}
				</tbody>		
			</Table>
			{ items.length > 0 && (
					<Row className="justify-content-center">
						<PaginationComponent 
							totalRegisters={ totalItems }
							send={ ( params ) => pagination( params )  }
							pagination={ 5 }
						/>
					</Row>
				)
			}
		</Fragment>
	);
}