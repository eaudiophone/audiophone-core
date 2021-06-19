import React, { Component } from 'react';
import { TitleComponent } from '../../components/index';
import { RedirectService } from '../../services/RedirectService';

export class BalancePage extends Component {
  constructor() {
    super();
    this.state = { redirect: false };
    this.route = '/login';
  }

  render() {
    return (
      <>
        { this.state.redirect && ( <RedirectService route={ this.route } /> ) }
        <TitleComponent
          title="Balance de clientes"
          back={ () => {
            this.route = '/clients';
            this.setState({ redirect: true });
          }}
          isBack={ true }
        />
      </>
    )
  }
}
