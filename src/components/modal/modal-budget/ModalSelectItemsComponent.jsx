import React, { Fragment, Component } from 'react';
import { Modal, Button, Table, Row } from 'react-bootstrap';
import { PaginationComponent } from '../../index';

export class ModalSelectItemsComponent extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			itemsSelected: []
		};
	}	

	componentDidUpdate() {
		// console.log( this.state.itemsSelected );
	}

	selectItem( checked = true, item ) {

		if ( checked && !this.state.itemsSelected.includes( item ) ) {
			return this.setState({ itemsSelected: this.state.itemsSelected.concat([ item ]) });
			
		} else {
			return this.setState({ 
				itemsSelected: this.state.itemsSelected.filter( 
					( selectedItem ) => item.apiaudiophoneitems_id !== selectedItem.apiaudiophoneitems_id
				) 
			});

		}
	}

	showTable() {

		const { items, totalItems, pagination } = this.props;

		const headerTable = ['Id', 'Nombre:', 'Descripción:', 'Precio:', 'Acciones:'];

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

							return (
								<tr key={ item.apiaudiophoneitems_id } className="text-center">
									<td>{ item.apiaudiophoneitems_id }</td>
									<td>{ item.apiaudiophoneitems_name }</td>
									<td>{ item.apiaudiophoneitems_description }</td>
									<td>{ item.apiaudiophoneitems_price }</td>
									<td>
										<input 
											type="checkbox" 
											onChange={ ( $event ) => this.selectItem( $event.target.checked, item ) } 
											checked={ this.state.itemsSelected.includes( item ) }
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
		)
	}


	render() {

		const { showModal, closeModal } = this.props;

		return (
			<Modal show={ showModal } size="xl" onHide={ () => { 
				closeModal();

				return this.setState({ itemsSelected: [] });
			} 
		}>
      <Modal.Header closeButton>
        <Modal.Title>Selecciona los artículos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      	{ this.showTable() }
      </Modal.Body>
      <Modal.Footer>
        <Button 
        	variant="primary" 
        	disabled={ this.state.itemsSelected.length === 0 } 
        	onClick={ () => {
        			closeModal( this.state.itemsSelected );

        			return this.setState({ itemsSelected: [] });
        		} 
        	}
        >
          Aceptar
        </Button>
      </Modal.Footer>
     </Modal>
		);
	}
}