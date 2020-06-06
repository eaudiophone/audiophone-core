import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import AuthService from './../../services/AuthService'; 
import RedirectService  from './../../services/RedirectService';

import ToastComponent from './../../components/toasts/ToastComponent';
import LoginForm from '../../components/form/login-form/LoginForm';

import './LoginPage.css';

class LoginPage extends Component {

  authService =  new AuthService();
  message = '';
  action = '';

	constructor( props ) {
		
		super( props );

		this.state = {  
      redirect: false,
      showToast: false,
      loading: false
		};

		this.getFormData = this.getFormData.bind( this ); 
	}

	getFormData( value, actions ) {

	  actions.setSubmitting( false );

    this.setState({ loading: true });

    setTimeout( () => {

      this.authService.logIn( value ).then( resp => {

        if ( resp ) {
          this.setState({ redirect: true, loading: false }); 
        
        } else {
          
          this.message = 'credenciales incorrectas';
          this.action = 'Error';

          this.setState({ showToast: true, loading: false });
        }
      }); 

    }, 1000 );
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

        <LoginForm loading={ this.state.loading } getFormData={ this.getFormData } />

      </Container>
   	);
	}
}

export default LoginPage;