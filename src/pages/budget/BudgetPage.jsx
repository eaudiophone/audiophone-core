import React, { Component, Fragment } from 'react';
import { Button, Nav, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSpanishFormatDate } from '../../util-functions/date-format';
import { BudgetTableComponent } from '../../components/index';

export class BudgetPage extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			items: []
		};
	}

	addItem() {
	}

	removeItem() {
	}

	render() {

		return (
			<Fragment>
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap 
						align-items-center pb-2 mb-3 border-bottom">
					<h2>Presupuesto de servicios</h2>
				</div>

				<Row className="p-3">
					<Col xs={ 12 } md={ 6 }>
						<h2 className="mb-3">Estudios Audiophone S.A</h2>
						<p>
							Avenida Principal El Manicomio, <br />
							Esquina Trinchera, Casa #152 <br />
							Caracas - Venezuela <br />
							Telefonos: 0212-862-34-92 0416-905-57-06 <br />
							Email: eaudiophonesa@gmail.com <br />
						</p>	
					</Col>
					<Col xs={ 12 } md={ 6 }>
						<h3>Presupuesto</h3>
						<p>
							<b className="mr-2">N°:</b>  <br/>
							<b className="mr-2">Fecha:</b> { getSpanishFormatDate( new Date().toISOString() ) }
						</p>
					</Col>
					<Col xs={ 12 } className="mt-3">
						<h2 className="mb-3">Datos del cliente</h2>
						<p>
							nombre del cliente: <span>prueba</span><br />
							email: <span>prueba@gmail.com</span> 
						</p>
					</Col>
				</Row>

				<BudgetTableComponent items={ this.state.items } />

				<Row className="mt-5 justify-content-center">	
					<Button variant="primary">
						Generar Presupuesto
					</Button>
				</Row>
			</Fragment>
		);
	}
}