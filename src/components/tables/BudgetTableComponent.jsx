import  React, { Component, Fragment } from 'react';
import { PaginationComponent, SearchBarComponent } from '../index';
import { Row, Table } from 'react-bootstrap';

const headerTable = ['id:', 'Tipo de Presupuesto:', 'Nombre cliente:', 'Telefono:', 'Acciones:'];

export const BudgetTableComponent = ( props ) => {
	
	const { pagination, showPdf, budgets, totalBudgets, search } = props;

	return (
		<Fragment>
			<SearchBarComponent sendSearch={ ( stringSearch ) => search( stringSearch ) } />
			<Table className="mt-4" striped responsive hover>
				<thead className="thead-dark">
					<tr>
						{ headerTable.map(( columnName, index ) => (
								<th key={ index } className="text-center">{ columnName }</th>
							)) 
						}	
					</tr>
				</thead>
				<tbody>
					{ budgets.length === 0 && (
							<tr className="text-center">
								<td colSpan="5">No hay informacion de presupuestos generados</td>
							</tr>
						) 
					}
				</tbody>
			</Table>
			<Row className="justify-content-center">
				<PaginationComponent 
					totalRegisters={ totalBudgets } 
					send={ ( params ) => pagination( params ) } 
					pagination={ 5 } 
				/>
			</Row>
		</Fragment>
	);
}

