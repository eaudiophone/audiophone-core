import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { AuthService } from './../../services/AuthService'; 
import { RedirectService }  from './../../services/RedirectService';
import { ToastComponent } from './../../components/toasts/ToastComponent';
import LoginForm from '../../components/form/login-form/LoginForm';

import './LoginPage.css';

class LoginPage extends Component {

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


    this.setState({ loading: true });

    setTimeout( () => {

      this.authService.logIn( value ).then( resp => {

        if ( resp.status === 200 ) { // ok
	        
          actions.setSubmitting( false );
          this.setState({ redirect: true, loading: false }); 
        
        } else {
           
          actions.setSubmitting( false );
          this.message = resp.message;
          this.action = 'Error';

          this.setState({ showToast: true, loading: false });
        }
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