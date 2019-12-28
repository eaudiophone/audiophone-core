import React, { Component } from 'react';
import AuthService from './../../services/AuthService';

class Login extends Component {

	constructor( props ) {
		
		super( props );

		// initial state
		this.state = {  
			user: localStorage.getItem('email') || '',
			password: '',
            remember: false
		};

        // events and vinculation with the state
		this.handleInputChange = this.handleInputChange.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this ); 

        // services
        this.authService = new AuthService();
	}

	handleInputChange( event ) {

        const target = event.target;
		const name = target.name;
		const value = target.type === 'checkbox' ? target.checked : target.value;

		this.setState({ [ name ]: value });
	}

	handleSubmit( event ) {

		const login = {
			user: event.target[0].value,
			password: event.target[1].value,
		};

        const rememberMe = event.target[2].checked;

		this.authService.logIn( login, rememberMe );

		event.preventDefault(); 
	}

  	render() {

    	return (

    		<div>
    			<h2>Estudios audiophone</h2>

    			<form onSubmit={ this.handleSubmit }> 

    				<div>
    					<label>user:</label>
    					<input 
    						type="email" 
    						value={ this.state.user }
    						name="user" 
    						onChange={ this.handleInputChange }
    						required 
    					/>
    				</div>

    				<div>
    					<label>password:</label>
    					<input 
    						type="password" 
    						value={ this.state.password }
    						name="password" 
    						onChange={ this.handleInputChange } 
    						required
    					/>
    				</div>

                    <div>
                        <label>remember me:</label>
                        <input 
                            name="remember"
                            type="checkbox"
                            checked={ this.state.remember }
                            onChange={ this.handleInputChange }
                        />    
                    </div>

    				<div>
    					<input type="submit" value="Log In" />
    				</div>

    			</form>
    		</div>
     	);
  	}
}

export default Login;
