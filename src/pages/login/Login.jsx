import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

import AuthService from './../../services/AuthService'; 

import './Login.css';

class Login extends Component {

	constructor( props ) {
		
		super( props );

		// initial state
		this.state = {  
			email: localStorage.getItem('email') || '',
            password: '',
            remember: false,
            redirect: false
		};

        // events and vinculation with the state
		this.handleInputChange = this.handleChange.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this ); 
        this.resetForm = this.resetForm.bind( this );

        // services
        this.authService = new AuthService();
	}

	handleChange( event ) {

        const target = event.target;
		const name = target.name;
		const value = target.value;

		this.setState({ [ name ] : value });
	}

	handleSubmit( event ) {

		const login = {
			email: event.target[0].value,
			password: event.target[1].value,
		};

        const rememberMe = event.target[2].checked;
		this.authService.logIn( login, rememberMe );
        
        this.setState({ redirect: true });
  
		event.preventDefault(); 
	}

    resetForm( event ) {
        
        document.getElementById('check').checked = false; 
    
        this.setState({
            email: '',
            password: '',
            remember: false
        });
    }

    redirectTo() {
        
        if ( this.state.redirect ) {
            return ( <Redirect to="/home" /> );
        }
    }

    getEmailInput() {
    	
    	return (

    		<Form.Group controlId="inputEmail">
    			<Form.Label>email:</Form.Label>
    			<Form.Control
                    name="email"
                    type="email"
                    value={ this.state.email }  
    				onChange={ this.handleInputChange }
    				required 
    				/>
    		</Form.Group>

    	);
    }

    getPasswordInput() {

    	return (

    		<Form.Group controlId="inputPassword">
            	<Form.Label>password:</Form.Label>
    			<Form.Control
                    name="password"
    				type="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password } 
    				required
    		    />
    	    </Form.Group>
    	);
    }

    getCheckboxInput() {

    	return (
    		 
    		 <Form.Group controlId="inputRemember">
                <Form.Check
                    id="check"
                    name="remember"
                    type="checkbox"
                    label="remember me"
                    value={ this.state.remember }
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

    getButtons() {

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
                    onClick={ this.resetForm }
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

            <Container>
      
                <Form className="form-signin" onSubmit={ this.handleSubmit }> 

                    <h2 className="mb-3">Estudio Audiophone</h2>
                    <h3 className="mb-3 text-center">
                        Sign In
                    </h3>

                    { this.getEmailInput() }
                    { this.getPasswordInput() }
                    { this.getCheckboxInput() }
                    { this.getButtons() }
                    { this.getRegister() }

                    <p className="mt-3 mb-3 text-muted text-center">
                        &copy; Audiophone 2018
                    </p>
                          
                </Form>

                { this.redirectTo() } 

            </Container>
     	);
  	}
}

export default Login;