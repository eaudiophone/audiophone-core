import React, { Component } from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { SearchBarComponent, ToastComponent, LoadingComponent, PaginationComponent } from '../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalBalanceComponent, ModalBalanceConfirmComponent } from '../modal/index';
import { BalanceServices } from '../../services/BalanceService';

export class BalanceTableComponent extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      loading: true,
      balances: [],
      totalBalances: 0,
      showModal: false,
      showToast: false,
      total: 0, // es el calculo del balance
      showModalConfirm: false
    };
    this.header = ['N°', 'Fecha', 'Descripcion', 'Horas Laboradas',
      'Tarifa por hora', 'Debe', 'Haber', 'Total', 'Acciones'];
    this.typeModal = null;
    this.balanceServices = new BalanceServices();
    this.action = '';
    this.message = '';
    this.balanceSelected = null;
  }

  componentDidMount() {
    this.getBalance();
  }

  getBalance( pagination = { start: 1, end: 5 } ) {

    this.balanceServices.getBalanceClient( pagination, this.props.clientId )
      .then(( response ) => {
        this.setState( response );
        sessionStorage.setItem('balancePagination', JSON.stringify( pagination ));
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

    // se elimina el total para no enviar a la bd
    delete values.apiaudiophonebalances_total;

    if ( values.apiaudiophonebalances_haber === values.apiaudiophonebalances_debe ) {

      actions.setSubmitting( false );

      this.message = 'No puedes colocar el mismo valor en la columna del debe y el haber';
      this.action = 'Error';

      this.setState({
        showToast: true,
        showModal: false
      });

      return;
    }

    // se resetean los valores del debe y haber
    if ( +values.apiaudiophonebalances_debe > 0 ) {
      values.apiaudiophonebalances_haber = 0;

    } else if ( +values.apiaudiophonebalances_haber > 0 ) {
      values.apiaudiophonebalances_debe = 0;

    }

    values = {
      ...values,
      apiaudiophonebalances_debe: Number.parseFloat( values.apiaudiophonebalances_debe ),
      apiaudiophonebalances_haber: Number.parseFloat( values.apiaudiophonebalances_haber ),
      id_apiaudiophoneclients: this.props.clientId
    };

    // inserta los datos
    this.balanceServices.createBalanceClient( values )
      .then(( response ) => {

        this.message = response.message;
        this.action = 'Exito';

        // actualiza el listado obtenemos la primera pagina
        this.balanceServices.getBalanceClient( { start: 1, end: 5 }, this.props.clientId )
          .then(( response ) => {

            actions.setSubmitting( false );

            this.setState({
              showToast: true,
              showModal: false,
              totalBalances: response.totalBalances,
              balances: response.balances
            })
          })
          .catch(( error ) => {

            if ( error.status === 401 ) {
              this.props.redirect();

              return;
            }

            actions.setSubmitting( false );

            // console.log( error );

            this.message = error.message;
            this.action = error.action;

            this.setState({ showToast: true, showModal: false });
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
    let { actions, values } = balance;

    // se elimina el total para no enviar a la bd
    delete values.apiaudiophonebalances_total;

    if ( values.apiaudiophonebalances_haber === values.apiaudiophonebalances_debe ) {

      actions.setSubmitting( false );

      this.message = 'No puedes colocar el mismo valor en la columna del debe y el haber';
      this.action = 'Error';

      this.setState({
        showToast: true,
        showModal: false
      });

      return;
    }

    // se resetean los valores del debe y haber
    if ( +values.apiaudiophonebalances_debe > 0 ) {
      values.apiaudiophonebalances_haber = 0;

    } else if ( +values.apiaudiophonebalances_haber > 0 ) {
      values.apiaudiophonebalances_debe = 0;

    }

    values = {
      ...values,
      apiaudiophonebalances_debe: Number.parseFloat( values.apiaudiophonebalances_debe ),
      apiaudiophonebalances_haber: Number.parseFloat( values.apiaudiophonebalances_haber ),
      id_apiaudiophoneclients: this.props.clientId
    };

    this.balanceServices.updateBalance( values )
      .then(( response ) => {

        this.message = response.message;
        this.action = 'Exito';

        // actualiza el listado despues de actualizar
        this.balanceServices.getBalanceClient(
          JSON.parse( sessionStorage.getItem('balancePagination') ),
          this.props.clientId
        )
          .then(( response ) => {

            actions.setSubmitting( false );

            this.setState({
              showToast: true,
              showModal: false,
              totalBalances: response.totalBalances,
              balances: response.balances
            })
          })
          .catch(( error ) => {

            if ( error.status === 401 ) {
              this.props.redirect();

              return;
            }

            actions.setSubmitting( false );

            // console.log( error );

            this.message = error.message;
            this.action = error.action;

            this.setState({ showToast: true, showModal: false });
          });
      })
      .catch(( error ) => {
        if ( error.status === 401 ) {
          this.props.redirect();
          return;
        }

        actions.setSubmitting( false );

        this.message = error.message;
        this.action = error.action;

        this.setState({
          showToast: true,
          showModal: false
        });
      });
  }

  deleteBalance( balance ) {

    if ( !balance ) {
      this.setState({ showModalConfirm: false });
      return;
    }

    // delete ...
    this.balanceServices.deleteBalance( balance )
      .then(( response ) => {

        this.message = response.message;
        this.action = 'Exito';

        // actualiza el listado despues de eliminar
        this.balanceServices.getBalanceClient(
          JSON.parse( sessionStorage.getItem('balancePagination') ),
          this.props.clientId
        )
          .then(( response ) => {

            this.setState({
              showToast: true,
              showModalConfirm: false,
              totalBalances: response.totalBalances,
              balances: response.balances
            })
          })
          .catch(( error ) => {

            if ( error.status === 401 ) {
              this.props.redirect();

              return;
            }

            // console.log( error );

            this.message = error.message;
            this.action = error.action;

            this.setState({ showToast: true, showModalConfirm: false });
          });
      })
      .catch(( error ) => {
        if ( error.status === 401 ) {
          this.props.redirect();
          return;
        }

        this.message = error.message;
        this.action = error.action;

        this.setState({
          showToast: true,
          showModalConfirm: false
        });
      });
  }

  searchBalance( search ) {

    this.balanceServices.searchBalance( search, this.props.clientId )
      .then(( response ) => {
        // console.log( response );
        this.setState( response );
      })
      .catch(( error ) => {

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
      })

    // console.log( search );
  }

  dispatchEvent( type, payload ) {

    if ( type === 'new' ) {
      this.addBalance( payload );

    } else if ( type === 'edit' ) {
      this.editBalance( payload );

    } else if ( type === 'delete' ) {
      this.deleteBalance( payload );

    } else {
      this.setState({ showModal: false });
    }
  }

  handleClick( type = 'new', balance ) {

    if ( type === 'new' ) {
      this.balanceSelected = null;
      this.setState({ showModal: true });

    } else if ( type === 'edit' ) {
      this.balanceSelected = balance;
      this.setState({ showModal: true });

    } else { // delete
      this.balanceSelected = balance;
      this.setState({ showModalConfirm: true });

    }
  }

  showPagination() {

    if ( this.state.balances.length > 0 ) {
      return (
        <Row className="justify-content-center mt-2">
          <PaginationComponent
            totalRegisters={ this.state.totalBalances }
            pagination={ 5 }
            send={ ( params ) => this.getBalance( params ) }
          />
        </Row>
      );

    }
  }

  setRows() {

    if ( this.state.balances.length > 0 ) {
      return this.state.balances.map(( balance ) => (
        <tr className="text-center" key={ balance.apiaudiophonebalances_id }>
          <td>{ balance.apiaudiophonebalances_id }</td>
          <td>{ balance.apiaudiophonebalances_date }</td>
          <td>{ balance.apiaudiophonebalances_desc }</td>
          <td>{ balance.apiaudiophonebalances_horlab } horas</td>
          <td>{ balance.apiaudiophonebalances_tarif }$</td>
          <td>{ balance.apiaudiophonebalances_debe }$</td>
          <td>{ balance.apiaudiophonebalances_haber }$</td>
          <td className={ this.addClassTotal( balance.apiaudiophonebalances_total ) }>
            { balance.apiaudiophonebalances_total }$
          </td>
          <td>
            <Button
  						variant="primary"
  						size="sm"
  						className="mr-2"
  						onClick={ ( $event ) => this.handleClick( 'edit', balance ) }>
  						<FontAwesomeIcon icon="pen" className="point" />
  					</Button>
            <Button
              variant="danger"
              size="sm"
              onClick={ ( $event ) => this.handleClick('delete', balance ) }>
              <FontAwesomeIcon icon="trash" className="point" />
            </Button>
          </td>
        </tr>
      ));

    } else {
      return (
        <tr className="text-center">
          <td colSpan="9" className="text-danger">
            No existen registros de balances disponibles
          </td>
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
                  Nuevo registro
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
              {/*<tfoot>
                <tr className="text-right">
                  <td colSpan="8">Total:
                    <span className={ this.addClassTotal( this.state.total ) }>
                      { this.state.total }$
                    </span>
                  </td>
                </tr>
              </tfoot>*/}
            </Table>
            { this.showPagination() }
            <Row className="justify-content-center mt-3">
              <Button variant="primary" className="reset-button" disabled>
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
          balance={ this.balanceSelected }
        />
        <ModalBalanceConfirmComponent
          showModal={ this.state.showModalConfirm }
          closeModal={( type, payload ) => this.dispatchEvent( type, payload ) }
          balance={ this.balanceSelected }
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

  addClassTotal( total ) {
    // retorna un string
    if ( total < 0 ) {
      return 'text-danger ml-2';

    } else if ( total > 0 ) {
      return 'text-success ml-2'

    } else {
      return 'ml-2'
    }
  }
}
