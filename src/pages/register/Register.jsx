import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Form, Button, Row, Col  } from 'react-bootstrap';

import User from './../../models/UserModels';

import './Register.css';

class Register extends Component {

	constructor( props ) {

		super( props );

		this.state = {
			redirect: false,
			name: '',
			email: '',
			password: ''
		}

		this.handleSubmit = this.handleSubmit.bind( this );
		this.handleChange = this.handleChange.bind( this );
		this.resetForm = this.resetForm.bind( this );
	}

	handleChange( event ) {

        const target = event.target;
		const name = target.name;
		const value = target.value;

		this.setState({ [ name ] : value });
	}

	resetForm( event ) {
        
        this.setState({
        	name: '',
            email: '',
            password: '',
        });
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

			<Form.Group>
				<Form.Label>Nombre y apellido:</Form.Label>
				<Form.Control 
					type="text"
					name="name"
					size="lg"
					value={ this.state.name }
					onChange={ this.handleChange }
					required
				/>
			</Form.Group>
		);
	}

	getEmailInput() {

		return ( 

			<Form.Group>
				<Form.Label>Correo:</Form.Label>
				<Form.Control 
					type="email"
					name="email"
					size="lg"
					value={ this.state.email }
					onChange={ this.handleChange }
					required
				/>
			</Form.Group>
		 );
	}

	getPasswordInput() {
		
		return (

			<Form.Group>
				<Form.Label>Contraseña:</Form.Label>
				<Form.Control 
					type="password"
					name="password"
					size="lg"
					value={ this.state.password }
					onChange={ this.handleChange }
					required
				/>
			</Form.Group>
		);
	}

	getButtons() {

		return(

			<Row>
				<Col sm="6">
					<Button
						type="submit"
						variant="primary"
						size="lg"
						block
					>
						Registrar
					</Button>
				</Col>
				<Col sm="6">
					<Button
						type="reset"
						variant="secondary"
						size="lg"
						block
						onSubmit={ this.resetForm }
					>
						Cancelar
					</Button>
				</Col>
			</Row>
		);
	}

	render() {
		
		return ( 

			<Container>
				
				<Form className="form-register" onSubmit={ this.handleSubmit }>

					<h2 className="mb-5">
						Registro de usuarios
					</h2>
					
					{ this.getInputName() }
					{ this.getEmailInput() }
					{ this.getPasswordInput() }
					{ this.getButtons() }
					
				</Form>

				<p className="mt-5 text-center">
					<a href="/">Volver al login</a>
				</p>

				{ this.redirectTo() }
			</Container>
		);
	}
}

export default Register;