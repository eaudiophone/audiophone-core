import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import AuthService from './../../services/AuthService';

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

    		<div>
    			<h2>Estudios audiophone</h2>

    			<form onSubmit={ this.handleSubmit }> 

    				<div>
    					<label>email:</label>
    					<input 
                            name="email"
                            type="email"
                            value={ this.state.email }  
    						onChange={ this.handleInputChange }
    						required 
    					/>
    				</div>

    				<div>
    					<label>password:</label>
    					<input 
                            name="password"
    						type="password" 
    						required
    					/>
    				</div>

                    <div>
                        <label>remember me:</label>
                        <input 
                            name="remember"
                            type="checkbox"
                        />    
                    </div>

    				<div>
    					<input type="submit" value="Log In" />
                        <input type="reset" value="Cancelar" />
    				</div>

    			</form>

                { register() }
                { this.redirect() }
                
    		</div>
     	);
  	}
}

const register = () => (
       
    <div> 
        <p>
            Si no posees cuenta 
            <Link to="/register">Registrese</Link>
        </p>
    </div>
);

export default Login;
