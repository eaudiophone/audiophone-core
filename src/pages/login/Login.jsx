import React, { Component } from 'react';

// Componente principal
class Login extends Component {

	constructor( props ) {
		
		super( props );

		// estado del componente inicial
		this.state = {  
			user: '',
			password: ''
		};

		// vincula la funcion a un evento de addEventListener

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
			password: event.target[1].value
		};

		console.log( login );

		this.cleanForm( event.target );

		alert( 'datos enviados al servidor' );

		event.preventDefault();
	}

	cleanForm( element ) {

		element[0].value = '';
		element[1].value = '';

		this.setState({
			user: '',
			password: ''
		});

		console.log( this.state );
	}

  	render() {

    	return (

    		<div>
    			<h2>Estudios audiophone</h2>

    			<form onSubmit={ this.handleSubmit }> 

    				<div>
    					<label>user:</label>
    					<input 
    						type="text" 
    						value={ this.state.name }
    						name="user" 
    						onChange={ this.handleInputChange } 
    					/>
    				</div>

    				<div>
    					<label>password:</label>
    					<input 
    						type="password" 
    						value={ this.state.password }
    						name="password" 
    						onChange={ this.handleInputChange } 
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
