import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { AuthService } from './../../services/AuthService';
import { RedirectService }  from './../../services/RedirectService';
import { ToastComponent } from './../../components/toasts/ToastComponent';
import LoginForm from '../../components/form/login-form/LoginForm';

import './LoginPage.css';

export class LoginPage extends Component {

  authService =  new AuthService();
  message = '';
  action = '';

  componentDidMount() {
    this.setState({ logged: this.authService.isLogged() })
  }

	constructor( props ) {

		super( props );

		this.state = {
      redirect: false,
      showToast: false,
		};

		this.getFormData = this.getFormData.bind( this );
	}

	getFormData( value, actions ) {

    setTimeout( () => {

      this.authService.logIn( value )
        .then( resp => {

          actions.setSubmitting( false );

          return this.setState({ redirect: true });

        })
        .catch( error => {

          actions.setSubmitting( false );

          this.message = error.message;
          this.action = 'Error';

          return this.setState({ showToast: true });
        });

    }, 2000 );
	}

	render() {

  	return (

      <Container className="container-login">

        { this.state.redirect && ( <RedirectService route="/profile" /> ) }

        <ToastComponent
          showToast={ this.state.showToast }
          content={ this.message }
          context={ this.action }
          onHide={ () => this.setState({ showToast: false }) }
        />

        <LoginForm getFormData={ this.getFormData } />

      </Container>
   	);
	}
}

export default LoginPage;
