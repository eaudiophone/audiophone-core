import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import AuthService from './../../services/AuthService'; 
import RedirectService  from './../../services/RedirectService';
import LoginSchema from './LoginSchema';
import Login from './../../models/LoginModels';
import './LoginPage.css';
import BackendService from './../../services/BackendService';

class LoginPage extends Component {

	constructor( props ) {
		
		super( props );

		this.state = {  
      redirect: false
		};

    this.backendService = new BackendService();
		this.getFormData = this.getFormData.bind( this ); 
	}

	getFormData( value, actions ) {

	  actions.setSubmitting( false );

    let authService = new AuthService();
    authService.logIn( value, value.remember );
        
    this.setState({ redirect: true });
	}

    redirectTo() {
        
      if ( this.state.redirect ) {
         return <RedirectService route="/profile" />
      }
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
              <Button
                  type="submit"
                  variant="primary"
                  size="lg" 
                  block
              >
                  Iniciar sesión
              </Button>
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

  	render() {

    	return (

        <Container className="container-login">

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

            { this.redirectTo() } 

        </Container>
     	);
  	}
}

export default LoginPage;