import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from './../../services/AuthService'; 

import './Login.css';

class Login extends Component {

	constructor( props ) {
		
		super( props );

		// initial state
		this.state = {  
			email: localStorage.getItem('email') || '',
            redirect: false
		};

        // events and vinculation with the state
		this.handleInputChange = this.handleChange.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this ); 

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

    redirectTo() {
        
        if ( this.state.redirect ) {
            return ( <Redirect to="/home" /> );
        }
    }

    getEmailInput() {
    	
    	return (

    		<div className="form-group">
    			<label htmlFor="inputEmail">email:</label>
    			<input
    				id="inputEmail" 
                    className="form-control"
                    name="email"
                    type="email"
                    value={ this.state.email }  
    				onChange={ this.handleInputChange }
    				required 
    				/>
    		</div>

    	);
    }

    getPasswordInput() {

    	return (
    		<div className="form-group">
    			<label htmlFor="inputPassword">password:</label>
    			<input
    				id="inputPassword"
                    className="form-control" 
                    name="password"
    				type="password" 
    				required
    			/>
    		</div>
    	);
    }

    getCheckboxInput() {

    	return (
    		 
    		 <div className="form-group form-check">
                <input
                   	className="form-check-input" 
                    name="remember"
                    type="checkbox"
                /> 
                <label id="remember">remember me</label>   
            </div>
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
                <input 
                    className="btn btn-primary btn-block btn-lg" 
                    type="submit" 
                    value="Log In" 
                />
                <input
                    className="btn btn-secondary btn-block btn-lg" 
                    type="reset" 
                    value="Cancelar" 
                />
            </div>
        );
    }

  	render() {

    	return (

    		<div className="container">
      
    			<form className="form-signin" onSubmit={ this.handleSubmit }> 

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
                	      
    			</form>

                { this.redirectTo() } 
    		</div>
     	);
  	}
}

export default Login;