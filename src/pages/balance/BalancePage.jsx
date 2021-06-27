import React, { Component } from 'react';
import { TitleComponent, BalanceTableComponent } from '../../components/index';
import { RedirectService } from '../../services/RedirectService';
import { Row, Col } from 'react-bootstrap';
import { getSpanishFormatDate } from '../../util-functions/date-format';

export class BalancePage extends Component {
  constructor() {
    super();
    this.state = { redirect: false };
    this.route = '/login';
    this.client = JSON.parse( sessionStorage.getItem('clientBalance') );
  }

  render() {
    return (
      <>
        { this.state.redirect && ( <RedirectService route={ this.route } /> ) }
        <TitleComponent
          title={`Balance de cliente ${ this.client.apiaudiophoneclients_id }`}
          back={ () => {
            this.route = '/clients';
            this.setState({ redirect: true });
          }}
          isBack={ true }
        />
        {/*  Informacion cliente */}
        <Row>
          <Col md={6}>
            <div  className="d-flex flex-row justify-content-between w-100 pb-3 pl-4 pr-4">
              <h5 className="font-weight-bold">Cliente:</h5>
              <h5>{ this.client.apiaudiophoneclients_name }</h5>
            </div>
            <div  className="d-flex flex-row justify-content-between w-100 pb-3 pl-4 pr-4">
              <h5 className="font-weight-bold">Teléfono cliente:</h5>
              <h5>{ this.client.apiaudiophoneclients_phone }</h5>
            </div>
          </Col>
          <Col md={6}>
            <div  className="d-flex flex-row justify-content-between w-100 pb-3 pl-4 pr-4">
              <h5 className="font-weight-bold">Número de identificación:</h5>
              <h5>{ this.client.apiaudiophoneclients_ident }</h5>
            </div>
            <div  className="d-flex flex-row justify-content-between w-100 pb-3 pl-4 pr-4">
              <h5 className="font-weight-bold">Fecha de documento:</h5>
              <h5>{ getSpanishFormatDate() }</h5>
            </div>
          </Col>
        </Row>
        <BalanceTableComponent
          clientId={ this.client.apiaudiophoneclients_id }  
          redirect={ ( route = '/login' ) => {
            this.route = route;
            this.setState({ redirect: true });
          }} />
      </>
    )
  }
}
