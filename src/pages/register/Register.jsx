import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import User from './../../models/UserModels';

import './Register.css';

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

	getInputName() {

		return (

			<div className="form-group">
				<label htmlFor="inputName">Nombre y apellido:</label>
				<input
					className="form-control form-control-lg"
					id="inputName" 
					type="text"
					name="name"
					required
					/>
			</div>
		);
	}

	getEmailInput() {

		return ( 

			<div className="form-group">
				<label htmlFor="inputEmail">Correo electronico:</label>
				<input
					id="inputEmail"
					className="form-control form-control-lg" 
					type="email"
					name="email"
					required
				/>
			</div>
		 );
	}

	getPasswordInput() {
		
		return (

			<div className="form-group">
				<label htmlFor="inputPassword">Nueva Contraseña:</label>
				<input
					className="form-control form-control-lg"
					id="inputPassword" 
					type="password"
					name="password"
					required
				/>
			</div>
		);
	}

	getButtons() {

		return(
			
			<div className="row">
				<div className="col-6">
					<input 
						type="submit" 
						value="Registrar" 
						className="btn btn-primary btn-lg btn-block"
					/>
				</div>
				<div className="col-6">
					<input 
						type="reset" 
						value="Cancelar" 
						className="btn btn-secondary btn-lg btn-block"
					/>	
				</div>	
			</div>
		);
	}

	render() {
		
		return ( 

			<div className="container">
				
				<form className="form-register" onSubmit={ this.handleSubmit }>

					<h2 className="mb-5">
						Registro de usuarios
					</h2>
					
					{ this.getInputName() }
					{ this.getEmailInput() }
					{ this.getPasswordInput() }
					{ this.getButtons() }
					
				</form>

				<p className="mt-5 text-center">
					<a href="/">Volver al login</a>
				</p>

				{ this.redirectTo() }
			</div>
		);
	}
}

export default Register;