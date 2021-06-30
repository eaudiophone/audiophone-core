import React, { Component } from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { SearchBarComponent, ToastComponent, LoadingComponent, PaginationComponent } from '../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalBalanceComponent } from '../modal/index';
import { BalanceServices } from '../../services/BalanceService';

export class BalanceTableComponent extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      loading: false,
      balances: [],
      totalBalances: 0,
      showModal: false,
      showToast: false
    };
    this.header = ['Fecha', 'Horas Laboradas', 'Tarifa por hora', 'Debe', 'Haber', 'Acciones'];
    this.typeModal = 'new';
    this.balanceServices = new BalanceServices();
    this.action = '';
    this.message = '';
  }

  componentDidMount() {
    this.getBalance();
  }

  getBalance( pagination = null ) {

    this.balanceServices.getBalanceClient( pagination, this.props.clientId )
      .then(( response ) => {
        this.setState( response );
      })
      .catch(( error ) => {

        if ( error.status === 401 ) {
          this.props.redirect();

          return;
        }

        // console.log( error );

        this.message = error.message;
        this.action = error.action;

        this.setState({
          showToast: true,
          loading: false
        });
      });
  }

  addBalance( balance ) {

    let { actions, values } = balance;

    // se calcula el total
    if ( this.state.balances.length === 0 ) {
      values.apiaudiophonebalances_total = values.apiaudiophonebalances_debe - values.apiaudiophonebalances_haber
    }

    values = { ...values, id_apiaudiophoneclients: this.props.clientId };


    this.balanceServices.createBalanceClient( values )
      .then(( response ) => {

        this.setState({
          showModal: false,
          balances: this.state.balances.concat([ response.balance ]),
          totalBalances: response.totalBalances
        });

      })
      .catch( ( error ) => {

        if ( error.status === 401 ) {
          this.props.redirect();
          return;
        }

        this.message = error.message;
        this.action = error.action;

        this.setState({
          showToast: true,
          showModal: false

        });
      });
  }

  editBalance( balance ) {
  }

  searchBalance( search ) {
    console.log( search );
  }

  dispatchEvent( type, payload ) {

    if ( this.typeModal === 'new' ) {
      console.log( this.typeModal );
      this.addBalance( payload );

    } else if ( this.typeModal === 'edit' ) {
      this.editBalance( payload );

    } else {
      this.setState({ showModal: false });
    }
  }

  handleClick( type = 'new', balance ) {
    this.typeModal = type;
    this.setState({ showModal: true });
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
        { this.state.loading && ( <LoadingComponent /> ) }
        { !this.state.loading && (
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
          </>
          )
        }

        {/* modal insert balance */}
        <ModalBalanceComponent
          showModal={ this.state.showModal }
          closeModal={ ( type, payload ) => this.dispatchEvent( type, payload ) }
        />
        <ToastComponent
          showToast={ this.state.showToast }
          content={ this.message }
          context={ this.action }
          onHide={ () => this.setState({ showToast: false }) }
        />
      </>
    );
  }
}
