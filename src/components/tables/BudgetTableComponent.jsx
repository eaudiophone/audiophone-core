import  React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export class BudgetTableComponent extends Component {
	
	headerTable = ['Cantidad', 'Descripción', 'Precio unitario', 'Subtotal'];
	
	constructor( props ) {
		super( props );

		this.state = {
			total: 0,
			items: props.items,
		};
	}

	setData() {
	}

	calculatePrice() {
	}

	render() {
		return (
			<Table className="mt-4" striped responsive hover>
				<thead className="thead-dark">
					<tr>
						{ this.headerTable.map(( columnName, index ) => (
								<th key={ index } className="text-center">{ columnName }</th>
							)) 
						}	
					</tr>
				</thead>
				<tbody>
				</tbody>
				<tfoot> {/* Presupuesto */}
					<tr>
						<td colSpan="4" className="text-right">
							Total a pagar: 
							<b className="ml-2">{ this.state.total }$</b>
						</td>
					</tr>
				</tfoot>
			</Table>
		);
	}
}