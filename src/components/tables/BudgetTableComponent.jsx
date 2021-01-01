import  React, { Fragment } from 'react';
import { PaginationComponent, SearchBarComponent } from '../index';
import { Row, Table, Button } from 'react-bootstrap';
import { getDateWithHour } from '../../util-functions/date-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const headerTable = [ 
	'Tipo de servicio:', 
	'Nombre cliente:', 
	'Correo cliente:', 
	'Creado:',
	'Acciones:'
];

export const BudgetTableComponent = ( props ) => {
	
	const { pagination, budgets, totalBudgets, search, dispatch } = props;

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
					{
						budgets.length > 0 && budgets.map(( budget ) => (
							<tr key={ budget.apiaudiophonebudgets_id } className="text-center">
								<td>{ budget.apiaudiophonebudgets_nameservice }</td>
								<td>{ budget.apiaudiophonebudgets_client_name }</td>
								<td>{ budget.apiaudiophonebudgets_client_email }</td>
								<td>{ getDateWithHour( budget.created_at ) }</td>
								<td>
									<Row className="justify-content-center">
										<Button 
											variant="secondary"
											size="sm"
											className="point mr-2 "
											onClick={ () => dispatch('showPdf') }
										>	
											<FontAwesomeIcon icon="file-pdf" />
										</Button>
										<Button 
											variant="info" 
											size="sm" 
											className="mr-2 point"
											onClick={ () => dispatch('edit', budget ) }
										>
											<FontAwesomeIcon icon="pen" />
										</Button>
										<Button 
											variant="danger" 
											size="sm" 
											className="point"
											onClick={ () => dispatch('delete', budget ) }
										>
											<FontAwesomeIcon icon="trash" />
										</Button>
									</Row>
								</td>
							</tr>
						))	
					}
					{ budgets.length === 0 && (
							<tr className="text-center">
								<td colSpan="5">No hay informacion de presupuestos generados</td>
							</tr>
						) 
					}
				</tbody>
			</Table>
			<Row className="justify-content-center mt-3">
				<PaginationComponent 
					totalRegisters={ totalBudgets } 
					send={ ( params ) => pagination( params ) } 
					pagination={ 5 } 
				/>
			</Row>
		</Fragment>
	);
}

