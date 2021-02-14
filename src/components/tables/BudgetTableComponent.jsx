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
	'Estado:',
	'Acciones:'
];

export const BudgetTableComponent = ( props ) => {
	
	const { pagination, budgets, totalBudgets, search, dispatch, showPdf } = props;

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
								<td>{ budget.apiaudiophonebudgets_nameservice.toLowerCase() }</td>
								<td>{ budget.apiaudiophonebudgets_client_name }</td>
								<td>{ budget.apiaudiophonebudgets_client_email }</td>
								<td>{ getDateWithHour( budget.created_at ) }</td>
								<td>
									<b className={ getStatusClass( budget.apiaudiophonebudgets_status ) }>
										{ budget.apiaudiophonebudgets_status }
									</b>
								</td>
								<td>
									<Row className="justify-content-center">
										<Button 
											variant="secondary"
											size="sm"
											className="point mr-2 "
											onClick={ () => showPdf( budget.apiaudiophonebudgets_url ) }
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
									</Row>
								</td>
							</tr>
						))	
					}
					{ budgets.length === 0 && (
							<tr className="text-center">
								<td colSpan="6">No hay informacion de presupuestos generados</td>
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

const getStatusClass = ( status ) => {

	if ( status === 'PAGADO' ) {
		return 'text-success';
	
	} else if ( status === 'NO_APLICA' ) {
		return 'text-danger'
	
	} else {
		return '';
	}
}

