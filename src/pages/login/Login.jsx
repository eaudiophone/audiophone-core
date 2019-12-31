import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
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

    redirect() {
        
        if ( this.state.redirect ) {
            return ( <Redirect to="/home" /> );
        }
    }

  	render() {

    	return (

    		<div className="container">

                <h2>Estudios Audiophone</h2>
              
    			<form onSubmit={ this.handleSubmit }> 

    				<div className="form-group">
    					<label>email:</label>
    					<input 
                            className="form-control"
                            name="email"
                            type="email"
                            value={ this.state.email }  
    						onChange={ this.handleInputChange }
    						required 
    					/>
    				</div>

    				<div className="form-group">
    					<label>password:</label>
    					<input
                            className="form-control" 
                            name="password"
    						type="password" 
    						required
    					/>
    				</div>

                    <div className="form-group form-check">
                        <input
                            className="form-check-input" 
                            name="remember"
                            type="checkbox"
                        /> 
                         <label id="remember">remember me</label>   
                    </div>

    				<div>
    					<input 
                            className="btn btn-primary btn-block" 
                            type="submit" 
                            value="Log In" 
                        />
                        <input
                            className="btn btn-secondary btn-block" 
                            type="reset" 
                            value="Cancelar" 
                        />
    				</div>

    			</form>

                { register() }
                { this.redirect() }
                
    		</div>
     	);
  	}
}

const register = () => (
       
    <div id="register"> 
        <p>
            Si no posees cuenta
            <Link to="/register">Registrese</Link>
        </p>
       
    </div>
);

export default Login;
