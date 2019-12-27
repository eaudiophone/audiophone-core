import React, { Component } from 'react';

class Login extends Component {

	constructor( props ) {
		
		super( props );

		// estado del componente inicial
		this.state = {  
			user: '',
			password: ''
		};

		this.handleInputChange = this.handleInputChange.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this ); 
	}

	handleInputChange( event ) {

		const name = event.target.name;
		const value = event.target.value

		this.setState({ [ name ]: value });
	}

	handleSubmit( event ) {

		const login = {
			user: event.target[0].value,
			password: event.target[1].value,
			login: true,
		};

		console.log('datos enviados al servidor: ', login );

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
    						value={ this.state.name }
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
    					<input type="submit" value="log in" />
    				</div>

    			</form>
    		</div>
     	);
  	}
}

export default Login;
