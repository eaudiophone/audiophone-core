import React, { Component } from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { SearchBarComponent, ToastComponent, LoadingComponent, PaginationComponent } from '../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalBalanceComponent } from '../modal/index';

export class BalanceTableComponent extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      balances: [],
      showModal: false
    };
    this.header = ['Fecha', 'Horas Laboradas', 'Tarifa por hora', 'Debe', 'Haber', 'Acciones'];
    this.typeModal = 'new';
  }

  addBalance( balance ) {
    console.log( balance );
  }

  modifyBalance() {

  }

  searchBalance( search ) {
    console.log( search );
  }

  handleClick( type = 'new', balance ) {
    if ( type === 'new' ) {

      this.setState({ showModal: true });

      return;
    }

    console.log('edit');
    return;
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
        <Row className="mt-4">
          <Col xs={ 12 } sm={ 10 }>
            <SearchBarComponent sendSearch={ ( stringSearch ) => this.searchBalance( stringSearch ) } />
          </Col>
          <Col xs={ 12 } sm={ 2 } className="align-self-end text-center mt-3 mt-md-0">
            <Button variant="success" className="reset-button" size="sm"
              onClick={ ( $event ) => this.handleClick( 'new', null ) }>
              <FontAwesomeIcon icon="plus" className="mr-2" />
              Nuevo balance
            </Button>
          </Col>
        </Row>
        <Table className="mt-4" striped hover responsive>
          <thead className="thead-dark">
            <tr className="text-center">
              { this.header.map( ( title, index ) => ( <th key={ index }>{ title }</th> ) ) }
            </tr>
          </thead>
          <tbody>
            { this.setRows() }
          </tbody>
        </Table>
        <Row className="justify-content-center mt-3">
          <Button
            variant="primary"
            className="reset-button"
            disabled
          >
            Generar Balance
          </Button>
        </Row>
        {/* modal insert balance */}
        <ModalBalanceComponent
          showModal={ this.state.showModal }
          closeModal={ () => this.setState({ showModal: false }) }
        />
      </>
    );
  }
}
