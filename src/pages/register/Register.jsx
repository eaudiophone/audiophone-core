import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import User from './../../Models/UserModels';

class Register extends Component {

	constructor( props ) {

		super( props );

		this.state = {
			redirect: false
		}

		this.handleSubmit = this.handleSubmit.bind( this );
	}

	handleSubmit( event ) {

		let user = new User( 
			event.target[0].value, 
			event.target[1].value, 
			event.target[2].value,
		);

		alert('cliente registrado');

		this.setState({ redirect: true });

		console.log( user );

		event.preventDefault();
	}

	redirectTo() {

		if ( this.state.redirect ) {
			return ( <Redirect to="/" /> );
		}
	}

	render() {
		
		return ( 

			<div>
				<h2>Registro de clientes</h2>

				<form onSubmit={ this.handleSubmit }>
					
					<div>
						<label>Nombre y apellido:</label>
						<input 
							type="text"
							name="name"
							required
						/>
					</div>

					<div>
						<label>Correo electronico</label>
						<input 
							type="email"
							name="email"
							required
						/>
					</div>

					<div>
						<label>Contraseña</label>
						<input 
							type="password"
							name="password"
							required
						/>
					</div>

					<div>
						<input type="submit" value="registrar" />
						<input type="reset" value="cancelar" />
					</div>

				</form>

				{ this.redirectTo() }
			</div>
		);
	}
}

export default Register;