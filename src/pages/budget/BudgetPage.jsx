import React, { Component, Fragment } from 'react';
import { Table } from 'react-bootstrap';
import { BudgetTableComponent } from '../../components/index';

export class BudgetPage extends Component {

	headerTable = ['id', 'Tipo de Presupuesto', 'Nombre cliente', 'Telefono', 'Acciones'];

	constructor( props ) {
		super( props );
		this.state = { redirect: true };
	}


	getTable() {
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
			</Table>
		);
	}


	render() {
		return (
			<Fragment>
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap 
						align-items-center pb-2 mb-3 border-bottom">
					<h2>Presupuesto de servicios</h2>
				</div>
				<BudgetTableComponent children={ this.getTable() } items={[]} />
			</Fragment>
		);
	}
}