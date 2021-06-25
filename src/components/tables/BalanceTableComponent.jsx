import React, { Component } from 'react';
import { Row, Col, Table } from 'react-bootstrap';

export class BalanceTableComponent extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      balances: []
    };
    this.header = ['Fecha', 'Horas Laboradas', 'Tarifa por hora', 'Debe', 'Haber', 'Acciones'];
  }

  addBalance() {

  }

  modifyBalance() {

  }

  setRows() {

    if ( this.state.balances.length > 0 ) {
      return (
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );

    } else {
      return (
        <tr className="text-center">
          <td colSpan={6} className="text-danger">No existen registros de balances disponibles</td>
        </tr>
      );

    }
  }

  render() {
    return (
      <>
        <Row>
          <Col></Col>
        </Row>
        <Table className="mt-4" striped hover responsive>
          <thead className="thead-dark">
            <tr className="text-center">
              { this.header.map( ( title, index ) => ( <th key={index}>{title}</th> ) ) }
            </tr>
          </thead>
          <tbody>
            { this.setRows() }
          </tbody>
        </Table>
      </>
    );
  }
}
