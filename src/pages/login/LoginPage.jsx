import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';

import AuthService from './../../services/AuthService'; 
import RedirectService  from './../../services/RedirectService';

import LoginSchema from './LoginSchema';
import Login from './../../models/LoginModels';

import ToastComponent from './../../components/toasts/ToastComponent';

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

    getEmailInput( value, handleChange, error ) {
    	
    	return (

    		<Form.Group>
    			<Form.Label>email:</Form.Label>
    			<Form.Control
            name="audiophoneusers_email"
            type="email"
            value={ value }  
    				onChange={ handleChange }
            isInvalid={ !!error } 
    			/>
          <Form.Control.Feedback type="invalid">
            { error }
          </Form.Control.Feedback>
    		</Form.Group>
    	);
    }

    getPasswordInput( value, handleChange, error ) {

    	return (

  		<Form.Group>
        <Form.Label>password:</Form.Label>
  			<Form.Control
          name="audiophoneusers_password"
  				type="password"
          onChange={ handleChange }
          value={ value } 
  				isInvalid={ !!error } 
  		   />
         <Form.Control.Feedback type="invalid">
           { error }
         </Form.Control.Feedback>
  	    </Form.Group>
    	);
    }

    getCheckboxInput( value, handleChange ) {

    	return (
    		 
    		 <Form.Group>
          <Form.Check
            id="remember"
            name="remember"
            type="checkbox"
            label="remember me"
            onChange={ handleChange }
            value={ value }
          /> 
         </Form.Group>
    	);
    }

    getRegister() {

    	return (
            
    		 <div className="register"> 
        		<p>
            		Si no posees cuenta
            		<a href="/register">Registrese</a>
        		</p>
    		</div>
    	);
    }

    getButtons( handleReset ) {

        return (

          <div>
            { this.showButton() }
              
              <Button
                onClick={ handleReset }
                variant="secondary"
                size="lg"
                block
              >
                  Cancelar
              </Button>
          </div>
        );
    }

    showButton() {

      if ( !this.state.loading ) {
        return (
          <Button type="submit" variant="primary" size="lg" block>
            Iniciar sesión
          </Button>
        );
      }

      return (
        <Button variant="primary" size="lg" block disabled>
          <i className="fas fa-spinner fa-spin mr-2"></i>
          Iniciar sesión
        </Button>
      );

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

            <Formik
                initialValues={ new Login( localStorage.getItem('email') ) }
                validationSchema={ new LoginSchema().getSchema() }
                onSubmit={ this.getFormData }
                validateOnChange={ false }
            >
              {({ handleSubmit, handleChange, handleReset, values, errors }) => (

                 <Form 
                   className="form-signin" 
                   onSubmit={ handleSubmit }
                   noValidate
                  > 

                    <h2 className="mb-3">Estudio Audiophone</h2>
                    <h3 className="mb-3 text-center">
                      Sign In
                    </h3>                  

                    { this.getEmailInput( values.audiophoneusers_email, handleChange, errors.audiophoneusers_email ) }
                    { this.getPasswordInput( values.audiophoneusers_password, handleChange, errors.audiophoneusers_password ) }
                    { this.getCheckboxInput( values.remember, handleChange ) }
                    { this.getButtons( handleReset ) }
                    { this.getRegister() }

                    <p className="mt-3 mb-3 text-muted text-center">
                      &copy; Audiophone 2018
                    </p>
                      
                   </Form>
              )}
            </Formik>

        </Container>
     	);
  	}
}

export default LoginPage;